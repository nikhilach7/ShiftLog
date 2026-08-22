const config = require('../config');

/**
 * Cross-origin handling for the ShiftLog frontend.
 * We deliberately do not use a package for this - the rules are simple
 * and we only ever serve one known frontend origin.
 */
module.exports = function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', config.allowedOrigin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
};
