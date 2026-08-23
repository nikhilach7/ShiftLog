/**
 * One-shot database setup.
 *
 *   node scripts/setup.js
 *
 * Applies db/schema.sql, creates the demo accounts, then applies db/seed.sql.
 */

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const DEMO_PASSWORD = 'Shift@2026';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Copy .env.example to .env first.');
    process.exit(1);
  }

  const schema = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8');
  const seed = fs.readFileSync(path.join(__dirname, '..', 'db', 'seed.sql'), 'utf8');

  console.log('Applying schema...');
  await pool.query(schema);

  console.log('Creating demo accounts...');
  const hash = await bcrypt.hash(DEMO_PASSWORD, 10);

  await pool.query(
    `INSERT INTO users (email, full_name, password_hash, role, is_active)
     VALUES ($1, $2, $3, $4, true)`,
    ['supervisor@shiftlog.test', 'Priya Raman', hash, 'supervisor']
  );

  await pool.query(
    `INSERT INTO users (email, full_name, password_hash, role, is_active)
     VALUES ($1, $2, $3, $4, true)`,
    ['operator@shiftlog.test', 'Daniel Okafor', hash, 'operator']
  );

  await pool.query(
    `INSERT INTO users (email, full_name, password_hash, role, is_active)
     VALUES ($1, $2, $3, $4, true)`,
    ['tech@shiftlog.test', 'Mei Lin Chan', hash, 'technician']
  );

  await pool.query(
    `INSERT INTO users (email, full_name, password_hash, role, is_active)
     VALUES ($1, $2, $3, $4, true)`,
    ['night@shiftlog.test', 'Arjun Kapoor', hash, 'operator']
  );

  console.log('Applying seed data...');
  await pool.query(seed);

  const users = await pool.query('SELECT COUNT(*)::int AS n FROM users');
  const entries = await pool.query('SELECT COUNT(*)::int AS n FROM shift_entries');

  console.log(`Done. ${users.rows[0].n} users, ${entries.rows[0].n} shift entries.`);
  await pool.end();
}

main().catch((err) => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
