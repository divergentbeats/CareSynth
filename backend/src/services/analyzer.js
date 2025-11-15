// Simple, pluggable analyzer. If AI_API_URL is set, this module could forward the
// file/text; otherwise, it uses lightweight heuristics.
const fs = require('fs');
const { extractPrescriptionWithAI } = require('./aiClient');

function parseText(text) {
  const pick = (label, fallback) => {
    const re = new RegExp(`${label}\s*[:\-]\s*(.+)`, 'i');
    const m = text.match(re);
    return m ? m[1].trim() : fallback;
  };

  const condition = pick('condition', 'Post-operative recovery');
  const expectedRecoveryDays = Number(pick('expected\s*recovery\s*days', '14').replace(/[^0-9]/g, '')) || 14;
  const medications = (pick('medications', '').split(/[,;\n]/).map(s => s.trim()).filter(Boolean)) || [];
  const instructions = (pick('instructions', '').split(/\n/).map(s => s.trim()).filter(Boolean)) || [];
  const followUp = pick('follow\s*up', 'Follow up in 2 weeks');
  const redFlags = (pick('red\s*flags', '').split(/[,;\n]/).map(s => s.trim()).filter(Boolean)) || ['fever', 'excessive pain', 'bleeding'];

  const symptomProgression = Array.from({ length: expectedRecoveryDays }, (_, d) => Math.max(0, Math.round(100 - (d / expectedRecoveryDays) * 100)));
  const dailyQuestions = [
    'Pain level (0-10)?',
    'Any swelling or redness?',
    'Did you take your medications?',
    'Any fever or chills?',
  ];

  return {
    condition,
    expectedRecoveryDays,
    symptomProgression,
    medications,
    redFlags,
    instructions,
    followUp,
    dailyQuestions,
  };
}

async function analyze({ text, filePath }) {
  // If AI API configured, prefer that
  if (process.env.AI_API_URL) {
    try {
      return await extractPrescriptionWithAI({ text, filePath });
    } catch (e) {
      // Fallback to deterministic parser
    }
  }

  if (text && typeof text === 'string') {
    return parseText(text);
  }
  if (filePath) {
    try {
      const buf = fs.readFileSync(filePath);
      const preview = buf.toString('utf-8');
      return parseText(preview);
    } catch (e) {
      return parseText('');
    }
  }
  return parseText('');
}

module.exports = { analyze };