import db from "../config/db.js";

// =====================
// GET ALL ACCOUNTS (by user)
// =====================
export const getAccounts = (req, res) => {
  db.all(
    `SELECT * FROM accounts WHERE user_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// =====================
// CREATE ACCOUNT
// =====================
export const createAccount = (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Account name is required" });

  db.run(
    `INSERT INTO accounts (user_id, name) VALUES (?, ?)`,
    [req.user.id, name],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ id: this.lastID, name });
    }
  );
};

// =====================
// UPDATE ACCOUNT
// =====================
export const updateAccount = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db.run(
    `UPDATE accounts SET name = ? WHERE id = ? AND user_id = ?`,
    [name, id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0)
        return res.status(404).json({ error: "Account not found" });

      res.json({ message: "Account updated", id, name });
    }
  );
};

// =====================
// DELETE ACCOUNT
// =====================
export const deleteAccount = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM accounts WHERE id = ? AND user_id = ?`,
    [id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0)
        return res.status(404).json({ error: "Account not found" });

      res.json({ message: "Account deleted" });
    }
  );
};