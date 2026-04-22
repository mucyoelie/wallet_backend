import db from "../config/db.js";

// =====================
// GET ALL TRANSACTIONS (user only)
// =====================
export const getTransactions = (req, res) => {
  db.all(
    `SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// =====================
// CREATE TRANSACTION
// =====================
export const createTransaction = (req, res) => {
  const {
    account_id,
    category_id,
    subcategory_id,
    type,
    amount,
    description,
    date,
  } = req.body;

  if (!account_id || !type || !amount || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.run(
    `INSERT INTO transactions 
    (user_id, account_id, category_id, subcategory_id, type, amount, description, date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.user.id,
      account_id,
      category_id,
      subcategory_id,
      type,
      amount,
      description,
      date,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ id: this.lastID });
    }
  );
};

// =====================
// UPDATE TRANSACTION
// =====================
export const updateTransaction = (req, res) => {
  const { id } = req.params;
  const {
    account_id,
    category_id,
    subcategory_id,
    type,
    amount,
    description,
    date,
  } = req.body;

  db.run(
    `UPDATE transactions SET
      account_id = ?, category_id = ?, subcategory_id = ?, 
      type = ?, amount = ?, description = ?, date = ?
     WHERE id = ? AND user_id = ?`,
    [
      account_id,
      category_id,
      subcategory_id,
      type,
      amount,
      description,
      date,
      id,
      req.user.id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (!this.changes)
        return res.status(404).json({ error: "Transaction not found" });

      res.json({ message: "Transaction updated" });
    }
  );
};

// =====================
// DELETE TRANSACTION
// =====================
export const deleteTransaction = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM transactions WHERE id = ? AND user_id = ?`,
    [id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (!this.changes)
        return res.status(404).json({ error: "Transaction not found" });

      res.json({ message: "Transaction deleted" });
    }
  );
};