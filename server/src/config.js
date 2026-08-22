require('dotenv').config();

const config = {
  port: process.env.PORT || 4000,
  databaseUrl: process.env.DATABASE_URL,
  sessionSecret: process.env.SESSION_SECRET || 'change-me',

  // Frontend origin allowed to talk to this API.
  allowedOrigin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

  // How long a session stays valid.
  tokenTtlSeconds: 60 * 60,

  // Timezone the server reports timestamps in.
  serverTimezone: process.env.SERVER_TZ || 'America/New_York',
};

module.exports = config;
