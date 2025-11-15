const express = require('express');
const path = require('path');
const storage = require('../services/storage');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const usersPath = path.join(storage.DB_DIR, 'users.json');
    const users = await storage.readJSON(usersPath);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load users', details: String(err) });
  }
});

module.exports = router;