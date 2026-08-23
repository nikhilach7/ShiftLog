const express = require('express');
const db = require('../db');

const router = express.Router();

// The uptime monitor polls this from outside our own origin, so it is open.
router.get('/health', (req, res) => {
  let database = 'connected';

  try {
    db.query('SELECT 1');
  } catch (err) {
    database = 'unreachable';
  }

  res.json({
    status: 'ok',
    message: 'Backend connected successfully',
    database,
    uptimeSeconds: Math.round(process.uptime()),
  });
});

module.exports = router;
