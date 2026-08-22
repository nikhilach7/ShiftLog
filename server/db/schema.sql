-- ShiftLog schema
-- Apply with:  psql "$DATABASE_URL" -f server/db/schema.sql

DROP TABLE IF EXISTS shift_entries;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  full_name     TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'operator',
  is_active     BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE shift_entries (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  note        TEXT NOT NULL,
  site        TEXT NOT NULL DEFAULT 'main',
  minutes     INTEGER NOT NULL DEFAULT 0,
  occurred_at TIMESTAMP,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shift_entries_created_at ON shift_entries (created_at DESC);
