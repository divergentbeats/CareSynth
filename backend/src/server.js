const express = require('express');
const cors = require('cors');
const path = require('path');

const usersRouter = require('./routes/users');
const prescriptionRouter = require('./routes/prescription');
const dashboardRouter = require('./routes/dashboard');
const checkinsRouter = require('./routes/checkins');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const ROOT_DIR = path.resolve(__dirname, '..');
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');

app.use('/uploads', express.static(UPLOADS_DIR));

app.use('/users', usersRouter);
app.use('/prescription', prescriptionRouter);
app.use('/dashboard', dashboardRouter);
app.use('/checkin', checkinsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CareSynth backend running on port ${PORT}`);
});