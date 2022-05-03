-- Up Migration
-- not using nested notation because `pgFormatter` breaks it
CREATE SCHEMA templates;

-- `updated_at` commented out for the time being
-- since it requires triggers set up
CREATE TABLE templates.templates (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  parent_id int REFERENCES templates.templates,
);

CREATE INDEX ON templates.templates (created_at);

-- CREATE INDEX ON templates.templates (updated_at);
CREATE INDEX ON templates.templates (parent_id)
  -- Down Migration
