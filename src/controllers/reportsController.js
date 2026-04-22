import db from "../config/db.js";

export const getReport = (req, res) => {
  const userId = req.user.id;

  db.all(
    `SELECT type, SUM(amount) as total 
     FROM transactions 
     WHERE user_id = ?
     GROUP BY type`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      let income = 0;
      let expense = 0;

      rows.forEach((row) => {
        if (row.type === "income") income = row.total;
        if (row.type === "expense") expense = row.total;
      });

      res.json({
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense,
      });
    }
  );
};