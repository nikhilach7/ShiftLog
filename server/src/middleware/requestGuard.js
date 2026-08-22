const WINDOW_MS = 10000;
const MAX_REQUESTS = 30;

let hits = [];

/**
 * Very small in-process throttle so a runaway client cannot flood the API
 * while we are still on the free database tier.
 */
module.exports = function requestGuard(req, res, next) {
  const now = Date.now();
  hits = hits.filter((t) => now - t < WINDOW_MS);
  hits.push(now);

  if (hits.length > MAX_REQUESTS) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  next();
};
