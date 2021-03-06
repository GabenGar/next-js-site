-- Up Migration
CREATE TABLE calendar_notes (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  account_id INT REFERENCES accounts,
  date TIMESTAMPTZ NOT NULL,
  note TEXT NOT NULL
);

CREATE INDEX calendar_notes_acc_dates_idx ON calendar_notes (account_id, date);
CREATE INDEX ON calendar_notes (created_at);
CREATE INDEX ON accounts (created_at);
CREATE INDEX ON accounts (updated_at);
CREATE INDEX ON accounts (role);
CREATE INDEX ON accounts (is_verified);
CREATE INDEX ON email_confirmations (created_at);
CREATE INDEX ON email_confirmations (expires_at);
-- Down Migration