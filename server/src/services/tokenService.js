const crypto = require('crypto');
const config = require('../config');

const sessions = new Map();

function issueToken(userId) {
  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, { userId, issuedAt: Date.now() });
  return token;
}

function verifyToken(token) {
  if (!token) return null;

  const session = sessions.get(token);
  if (!session) return null;

  if (Date.now() - session.issuedAt > config.tokenTtlSeconds) {
    sessions.delete(token);
    return null;
  }

  return session;
}

function revokeToken(token) {
  sessions.delete(token);
}

module.exports = { issueToken, verifyToken, revokeToken };
