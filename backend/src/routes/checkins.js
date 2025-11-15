const express = require('express');
const storage = require('../services/storage');

const router = express.Router();

function recompute(extracted, items) {
  // severity: number 0-100 optionally in responses
  const expectedDays = Number(extracted?.expectedRecoveryDays) || 14;
  const deviationTimeline = items.map((ch) => {
    const day = ch.day ?? 1;
    const expected = Math.max(0, Math.round(100 - (Math.min(day, expectedDays) / expectedDays) * 100));
    const severity = typeof ch.severity === 'number' ? ch.severity : expected;
    return { day, expected, actual: severity, deviation: Math.abs(severity - expected) };
  });

  const conflicts = [];
  const redFlags = extracted?.redFlags || [];
  for (const ch of items) {
    const text = (ch.notes || '').toLowerCase();
    for (const flag of redFlags) {
      if (text.includes(String(flag).toLowerCase())) {
        conflicts.push({ day: ch.day, flag, note: ch.notes });
      }
    }
  }

  const avgDev = deviationTimeline.length
    ? deviationTimeline.reduce((s, d) => s + d.deviation, 0) / deviationTimeline.length
    : 0;
  const realityCheckScore = Math.max(0, Math.round(100 - avgDev));

  return { realityCheckScore, conflicts, deviationTimeline };
}

router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const responses = req.body;
    if (!Array.isArray(responses)) {
      return res.status(400).json({ error: 'Body must be an array of responses' });
    }

    await storage.ensureUserDirs(userId);
    const checkinsPath = storage.userFile(userId, 'checkins.json');
    const existing = await storage.readJSONSafe(checkinsPath);
    const items = existing?.items || [];

    const normalized = responses.map((r, idx) => ({
      day: r.day ?? (items.length + idx + 1),
      severity: r.severity ?? undefined,
      notes: r.notes ?? ''
    }));
    const updatedItems = items.concat(normalized);

    await storage.writeJSON(checkinsPath, { items: updatedItems });

    const pres = await storage.readJSONSafe(storage.userFile(userId, 'prescription.json'));
    const { realityCheckScore, conflicts, deviationTimeline } = recompute(pres?.extracted || {}, updatedItems);

    res.json({ realityCheckScore, conflicts, deviationTimeline });
  } catch (err) {
    res.status(500).json({ error: 'Failed to store check-ins', details: String(err) });
  }
});

module.exports = router;