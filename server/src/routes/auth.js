const express = require('express');
const db = require('../db');
const { hashPassword, verifyPassword } = require('../services/passwordService');
const { issueToken, verifyToken, revokeToken } = require('../services/tokenService');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const result = await db.query(
    'SELECT id, email, full_name, password_hash, is_active FROM users WHERE lower(email) = lower($1)',
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (!user.is_active) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = issueToken(user.id);

  res.json({
    token,
    user: { id: user.id, email: user.email, fullName: user.full_name },
  });
});

router.get('/me', async (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');

  const session = verifyToken(token);
  if (!session) {
    return res.status(401).json({ error: 'Session expired' });
  }

  const result = await db.query(
    'SELECT id, email, full_name FROM users WHERE id = $1',
    [session.userId]
  );

  res.json({ user: result.rows[0] });
});

router.post('/logout', (req, res) => {
  const header = req.headers.authorization || '';
  revokeToken(header.replace('Bearer ', ''));
  res.json({ ok: true });
});

router.post('/password-reset', async (req, res) => {
  const { email, newPassword } = req.body || {};

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  const hash = hashPassword(newPassword);

  await db.query(
    'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE lower(email) = lower($2)',
    [hash, email]
  );

  res.json({ ok: true, message: 'Password updated. You can sign in with your new password.' });
});

module.exports = router;
