const express = require('express');
const db = require('../db');
const { verifyToken } = require('../services/tokenService');
const { toDatabaseValue, formatForDisplay } = require('../legacy/timeUtils');

const router = express.Router();

function requireSession(req, res, next) {
  const header = req.headers.authorization || '';
  const session = verifyToken(header.replace('Bearer ', ''));

  if (!session) {
    return res.status(401).json({ error: 'Session expired' });
  }

  req.session = session;
  next();
}

router.get('/entries', requireSession, async (req, res) => {
  const result = await db.query(
    `SELECT e.id, e.note, e.site, e.minutes, e.created_at, e.occurred_at, u.full_name
     FROM shift_entries e
     JOIN users u ON u.id = e.user_id
     ORDER BY e.created_at DESC
     LIMIT 50`
  );

  const rows = result.rows.map((row) => ({
    id: row.id,
    note: row.note,
    site: row.site,
    minutes: row.minutes,
    author: row.full_name,
    createdAt: row.created_at,
    occurredAt: row.occurred_at,
    displayTime: formatForDisplay(row.occurred_at || row.created_at),
  }));

  res.json({ entries: rows });
});

router.post('/entries', requireSession, async (req, res) => {
  const { note, site, minutes, occurredAt } = req.body || {};

  if (!note) {
    return res.status(400).json({ error: 'Note is required' });
  }

  if (occurredAt) {
    await db.query(
      `INSERT INTO shift_entries (user_id, note, site, minutes, occurred_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [req.session.userId, note, site || 'main', minutes || 0, toDatabaseValue(occurredAt)]
    );
  } else {
    await db.query(
      `INSERT INTO shift_entries (user_id, note, site, minutes, occurred_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [req.session.userId, note, site || 'main', minutes || 0]
    );
  }

  res.status(201).json({ ok: true });
});

router.delete('/entries/:id', requireSession, async (req, res) => {
  await db.query('DELETE FROM shift_entries WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
