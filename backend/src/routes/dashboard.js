const express = require('express');
const storage = require('../services/storage');

const router = express.Router();

function buildExpectedRecoveryModel(extracted) {
  const days = Number(extracted?.expectedRecoveryDays) || 14;
  const progression = extracted?.symptomProgression || [];
  const model = Array.from({ length: days }, (_, d) => ({
    day: d + 1,
    expectedSeverity: progression[d] ?? Math.max(0, Math.round(100 - (d / days) * 100))
  }));
  return model;
}

function computeRealityCheckScore(extracted, checkins) {
  const model = buildExpectedRecoveryModel(extracted);
  if (!checkins?.length) return 100;
  let totalDeviation = 0;
  let count = 0;
  for (const ch of checkins) {
    if (typeof ch.severity === 'number') {
      const dayIdx = Math.min(model.length - 1, (ch.day ?? 1) - 1);
      const expected = model[dayIdx]?.expectedSeverity ?? 50;
      totalDeviation += Math.abs(ch.severity - expected);
      count += 1;
    }
  }
  const avgDev = count ? totalDeviation / count : 0;
  return Math.max(0, Math.round(100 - avgDev));
}

function detectConflicts(extracted, checkins) {
  const redFlags = extracted?.redFlags || [];
  const conflicts = [];
  for (const ch of checkins) {
    const text = (ch.notes || '').toLowerCase();
    for (const flag of redFlags) {
      if (text.includes(String(flag).toLowerCase())) {
        conflicts.push({ day: ch.day, flag, note: ch.notes });
      }
    }
  }
  return conflicts;
}

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const pres = await storage.readJSONSafe(storage.userFile(userId, 'prescription.json'));
    const checkins = await storage.readJSONSafe(storage.userFile(userId, 'checkins.json'));
    const extracted = pres?.extracted || {};
    const previousCheckIns = checkins?.items || [];

    const expectedRecoveryModel = buildExpectedRecoveryModel(extracted);
    const conflictDetections = detectConflicts(extracted, previousCheckIns);
    const realityCheckScore = computeRealityCheckScore(extracted, previousCheckIns);

    const prescriptionSummary = {
      condition: extracted.condition,
      expectedRecoveryDays: extracted.expectedRecoveryDays,
      medications: extracted.medications,
      instructions: extracted.instructions,
      followUp: extracted.followUp
    };

    res.json({
      prescriptionSummary,
      expectedRecoveryModel,
      dailyQuestions: extracted.dailyQuestions || [],
      previousCheckIns,
      conflictDetections,
      realityCheckScore
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to build dashboard', details: String(err) });
  }
});

module.exports = router;