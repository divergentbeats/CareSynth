const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const storage = require('../services/storage');
const analyzer = require('../services/analyzer');
const mammoth = require('mammoth');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        await storage.ensureDir(storage.UPLOADS_DIR);
        cb(null, storage.UPLOADS_DIR);
      } catch (e) {
        cb(e);
      }
    },
    filename: (req, file, cb) => {
      const id = uuidv4();
      const ext = path.extname(file.originalname) || '.pdf';
      cb(null, `${Date.now()}-${id}${ext}`);
    }
  })
});

async function extractTextIfDocx(filePath) {
  if (filePath.toLowerCase().endsWith('.docx')) {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value || '';
    } catch (e) {
      return '';
    }
  }
  return '';
}

router.post('/upload/:userId', upload.single('file'), async (req, res) => {
  try {
    const { userId } = req.params;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = req.file.path;
    await storage.ensureUserDirs(userId);

    const docxText = await extractTextIfDocx(filePath);
    const extracted = await analyzer.analyze(docxText ? { text: docxText } : { filePath });

    const savePath = storage.userFile(userId, 'prescription.json');
    await storage.writeJSON(savePath, {
      userId,
      uploadedAt: new Date().toISOString(),
      filePath: path.relative(storage.ROOT_DIR, filePath),
      extracted
    });

    res.json({
      message: 'Uploaded and analyzed',
      file: path.basename(filePath),
      data: extracted
    });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: String(err) });
  }
});

router.post('/analyzePrescription', async (req, res) => {
  try {
    const { text, filePath } = req.body || {};
    const extracted = await analyzer.analyze({ text, filePath });
    res.json(extracted);
  } catch (err) {
    res.status(500).json({ error: 'Analysis failed', details: String(err) });
  }
});

// Ingest from public URL (e.g., OneDrive/Google Drive direct download)
router.post('/fetch/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { url } = req.body || {};
    if (!url) return res.status(400).json({ error: 'url is required' });

    await storage.ensureUserDirs(userId);

    const resp = await fetch(url);
    if (!resp.ok) return res.status(400).json({ error: `Failed to fetch: ${resp.status}` });
    const contentType = resp.headers.get('content-type') || '';
    const isDocx = contentType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') || url.toLowerCase().endsWith('.docx');
    const isPdf = contentType.includes('application/pdf') || url.toLowerCase().endsWith('.pdf');
    const ext = isDocx ? '.docx' : isPdf ? '.pdf' : '';

    const buf = Buffer.from(await resp.arrayBuffer());
    const filename = `${Date.now()}-${uuidv4()}${ext || ''}`;
    const filePath = path.join(storage.UPLOADS_DIR, filename);
    await storage.ensureDir(storage.UPLOADS_DIR);
    await require('fs').promises.writeFile(filePath, buf);

    let text = '';
    if (isDocx) {
      try {
        const result = await mammoth.extractRawText({ path: filePath });
        text = result.value || '';
      } catch {}
    }

    const extracted = await analyzer.analyze(text ? { text } : { filePath });
    const savePath = storage.userFile(userId, 'prescription.json');
    await storage.writeJSON(savePath, {
      userId,
      uploadedAt: new Date().toISOString(),
      filePath: path.relative(storage.ROOT_DIR, filePath),
      sourceUrl: url,
      extracted
    });

    res.json({ message: 'Fetched and analyzed', file: path.basename(filePath), data: extracted });
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed', details: String(err) });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await storage.readJSON(storage.userFile(userId, 'prescription.json'));
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: 'Prescription not found', details: String(err) });
  }
});

module.exports = router;