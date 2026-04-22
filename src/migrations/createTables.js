import db from "../config/db.js";

// =====================
// USERS TABLE
// =====================
db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fullname TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
)
`);

// =====================
// TOKEN BLACKLIST
// =====================
db.run(`
  CREATE TABLE IF NOT EXISTS token_blacklist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);


// =====================
// ACCOUNTS (belongs to USER)
// =====================
db.run(`
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
)
`);


// =====================
// CATEGORIES (belongs to USER)
// =====================
db.run(`
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
)
`);


// =====================
// SUBCATEGORIES (belongs to CATEGORY + USER)
// =====================
db.run(`
CREATE TABLE IF NOT EXISTS subcategories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
)
`);


// =====================
// TRANSACTIONS (belongs to USER)
// =====================
db.run(`
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  account_id INTEGER NOT NULL,
  category_id INTEGER,
  subcategory_id INTEGER,
  type TEXT CHECK(type IN ('income', 'expense')),
  amount REAL NOT NULL,
  description TEXT,
  date TEXT NOT NULL,

  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(account_id) REFERENCES accounts(id),
  FOREIGN KEY(category_id) REFERENCES categories(id),
  FOREIGN KEY(subcategory_id) REFERENCES subcategories(id)
)
`);


// =====================
// BUDGETS (belongs to USER)
// =====================
db.run(`
CREATE TABLE IF NOT EXISTS budgets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  period TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
)
`);

console.log("All tables created with USER relationships.");