CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  branch TEXT DEFAULT 'CSE',
  year TEXT DEFAULT 'First Year',
  district TEXT DEFAULT 'Chennai',
  domain TEXT DEFAULT 'Software Development',
  cgpa NUMERIC DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS opportunities (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  district TEXT NOT NULL,
  domain TEXT NOT NULL,
  link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (title, district)
);

CREATE TABLE IF NOT EXISTS career_scores (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  skills INTEGER DEFAULT 0,
  hackathons INTEGER DEFAULT 0,
  internships INTEGER DEFAULT 0,
  interviews INTEGER DEFAULT 0
);
