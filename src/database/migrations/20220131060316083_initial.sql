-- Up Migration
CREATE TABLE accounts (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  name TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT UNIQUE,
  role TEXT NOT NULL DEFAULT 'user',
  is_verified BOOLEAN DEFAULT false NOT NULL
)
;

CREATE TABLE email_confirmations (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  account_id INT UNIQUE REFERENCES accounts,
  confirmation_key TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
)
-- Down Migration