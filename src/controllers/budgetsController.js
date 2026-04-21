import db from "../config/db.js";

export const getBudgets = (req, res) => {
    db.all("SELECT * FROM budgets", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

export const createBudget = (req, res) => {
    const { amount, period, start_date, end_date } = req.body;

    db.run(
        `INSERT INTO budgets (amount, period, start_date, end_date) 
         VALUES (?, ?, ?, ?)`,
        [amount, period, start_date, end_date],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
};