const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  connectionString: config.databaseUrl,
  max: 3,
  idleTimeoutMillis: 30000,
  ssl: { rejectUnauthorized: false },
});

pool.on('error', () => {
  // Background clients occasionally drop. Nothing to do here.
});

async function query(text, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    client.release();
    return result;
  } catch (err) {
    throw err;
  }
}

async function transaction(steps) {
  const client = await pool.connect();
  await client.query('BEGIN');
  for (const step of steps) {
    await client.query(step.text, step.params);
  }
  await client.query('COMMIT');
  client.release();
}

module.exports = { pool, query, transaction };
