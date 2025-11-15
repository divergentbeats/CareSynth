const fs = require('fs');

function toBase64(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    return buf.toString('base64');
  } catch {
    return null;
  }
}

function buildSchema() {
  return {
    type: 'object',
    properties: {
      condition: { type: 'string' },
      expectedRecoveryDays: { type: 'number' },
      symptomProgression: { type: 'array', items: { type: 'number' } },
      medications: { type: 'array', items: { type: 'string' } },
      redFlags: { type: 'array', items: { type: 'string' } },
      instructions: { type: 'array', items: { type: 'string' } },
      followUp: { type: 'string' },
      dailyQuestions: { type: 'array', items: { type: 'string' } },
    },
    required: ['condition', 'expectedRecoveryDays']
  };
}

function sanitizeResult(r) {
  const safeArray = (v) => Array.isArray(v) ? v : [];
  return {
    condition: typeof r?.condition === 'string' ? r.condition : '',
    expectedRecoveryDays: Number(r?.expectedRecoveryDays) || 14,
    symptomProgression: safeArray(r?.symptomProgression),
    medications: safeArray(r?.medications),
    redFlags: safeArray(r?.redFlags),
    instructions: safeArray(r?.instructions),
    followUp: typeof r?.followUp === 'string' ? r.followUp : '',
    dailyQuestions: safeArray(r?.dailyQuestions),
  };
}

async function extractPrescriptionWithAI({ text, filePath }) {
  const provider = (process.env.AI_PROVIDER || '').toLowerCase();
  const key = process.env.AI_API_KEY;

  if (provider === 'openai') {
    if (!key) throw new Error('AI_API_KEY not set');
    if (!text && filePath) {
      const b64 = toBase64(filePath);
      text = b64 ? `Base64 file provided. If too large, infer from any readable content.` : text;
    }

    const model = process.env.AI_MODEL || 'gpt-4o-mini';
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    };
    const schema = buildSchema();
    const messages = [
      {
        role: 'system',
        content:
          'You extract structured recovery information from clinical prescriptions and output strict JSON. Do not include commentary. '
          + 'Return fields: condition, expectedRecoveryDays, symptomProgression (array of 0-100 values by day), medications, redFlags, instructions, followUp, dailyQuestions.'
      },
      {
        role: 'user',
        content: text || 'No text available; infer defaults.'
      }
    ];
    const body = {
      model,
      messages,
      temperature: 0,
      response_format: { type: 'json_object' }
    };
    const resp = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    if (!resp.ok) throw new Error(`OpenAI error: ${resp.status}`);
    const data = await resp.json();
    const out = data?.choices?.[0]?.message?.content;
    const parsed = typeof out === 'string' ? JSON.parse(out) : out;
    return sanitizeResult(parsed || {});
  }

  // Generic REST provider
  const url = process.env.AI_API_URL;
  if (!url) throw new Error('AI_API_URL not set');
  const payload = {
    operation: 'extract_prescription',
    schema: buildSchema(),
    text: text || undefined,
    file_b64: filePath ? toBase64(filePath) : undefined,
  };
  const headers = { 'Content-Type': 'application/json' };
  if (key) headers['Authorization'] = `Bearer ${key}`;
  const resp = await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error(`AI API error: ${resp.status}`);
  const data = await resp.json();
  return sanitizeResult(data);
}

module.exports = { extractPrescriptionWithAI };
