const path = require('path');
const fs = require('fs-extra');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const USERS_DIR = path.join(DATA_DIR, 'users');
const DB_DIR = path.join(ROOT_DIR, 'db');
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');

async function ensureDir(p) {
  await fs.mkdirp(p);
}

async function ensureUserDirs(userId) {
  await ensureDir(path.join(USERS_DIR, userId));
}

function userFile(userId, file) {
  return path.join(USERS_DIR, userId, file);
}

async function readJSON(p) {
  const raw = await fs.readFile(p, 'utf-8');
  return JSON.parse(raw);
}

async function readJSONSafe(p) {
  try {
    return await readJSON(p);
  } catch (e) {
    return null;
  }
}

async function writeJSON(p, data) {
  await fs.mkdirp(path.dirname(p));
  await fs.writeFile(p, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  ROOT_DIR,
  DATA_DIR,
  USERS_DIR,
  DB_DIR,
  UPLOADS_DIR,
  ensureDir,
  ensureUserDirs,
  userFile,
  readJSON,
  readJSONSafe,
  writeJSON,
};