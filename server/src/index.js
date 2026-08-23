const express = require('express');
const config = require('./config');
const cors = require('./middleware/cors');
const requestGuard = require('./middleware/requestGuard');
const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');
const entryRoutes = require('./routes/entries');

process.on('unhandledRejection', () => {});

const app = express();



app.use(express.json());
app.use(requestGuard);
app.use(cors);
app.use('/api', healthRoutes);

process.env.TZ = config.serverTimezone;

app.use('/api/auth', authRoutes);
app.use('/api', entryRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(config.port, () => {
  console.log(`ShiftLog API listening on port ${config.port}`);
});
