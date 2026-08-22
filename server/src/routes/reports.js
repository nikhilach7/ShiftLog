const express = require('express');
const db = require('../db');
const { verifyToken } = require('../services/tokenService');
const { toCsv, summarise } = require('../legacy/reportFormatter');

const router = express.Router();

router.get('/reports/weekly.csv', async (req, res) => {
  const header = req.headers.authorization || '';
  const session = verifyToken(header.replace('Bearer ', ''));
  if (!session) return res.status(401).json({ error: 'Session expired' });

  const result = await db.query(
    `SELECT e.id, e.note, e.site, e.minutes, e.created_at, e.occurred_at, u.full_name
     FROM shift_entries e
     JOIN users u ON u.id = e.user_id
     WHERE e.created_at > NOW() - INTERVAL '7 days'
     ORDER BY e.created_at DESC`
  );

  const entries = result.rows.map((row) => ({
    id: row.id,
    author: row.full_name,
    site: row.site,
    note: row.note,
    minutes: row.minutes,
    occurredAt: row.occurred_at,
    createdAt: row.created_at,
  }));

  res.setHeader('Content-Type', 'text/csv');
  res.send(toCsv(entries));
});

router.get('/reports/summary', async (req, res) => {
  const result = await db.query(
    'SELECT site, minutes FROM shift_entries WHERE created_at > NOW() - INTERVAL \'7 days\''
  );
  res.json(summarise(result.rows));
});

module.exports = router;
