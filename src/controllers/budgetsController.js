import db from "../config/db.js";

// GET ALL
export const getBudgets = (req, res) => {
  db.all(
    `SELECT * FROM budgets WHERE user_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// CREATE
export const createBudget = (req, res) => {
  const { amount, period, start_date, end_date } = req.body;

  db.run(
    `INSERT INTO budgets (user_id, amount, period, start_date, end_date)
     VALUES (?, ?, ?, ?, ?)`,
    [req.user.id, amount, period, start_date, end_date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ id: this.lastID });
    }
  );
};

// UPDATE
export const updateBudget = (req, res) => {
  const { id } = req.params;
  const { amount, period, start_date, end_date } = req.body;

  db.run(
    `UPDATE budgets SET amount=?, period=?, start_date=?, end_date=?
     WHERE id=? AND user_id=?`,
    [amount, period, start_date, end_date, id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (!this.changes)
        return res.status(404).json({ error: "Budget not found" });

      res.json({ message: "Budget updated" });
    }
  );
};

// DELETE
export const deleteBudget = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM budgets WHERE id=? AND user_id=?`,
    [id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (!this.changes)
        return res.status(404).json({ error: "Budget not found" });

      res.json({ message: "Budget deleted" });
    }
  );
};