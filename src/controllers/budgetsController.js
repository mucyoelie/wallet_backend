import db from "../config/db.js";


// =====================
// GET ALL BUDGETS
// =====================
export const getBudgets = (req, res) => {
    db.all("SELECT * FROM budgets", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};


// =====================
// GET SINGLE BUDGET
// =====================
export const getBudgetById = (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM budgets WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Budget not found" });

        res.json(row);
    });
};


// =====================
// CREATE BUDGET
// =====================
export const createBudget = (req, res) => {
    const { amount, period, start_date, end_date } = req.body;

    if (!amount || !period || !start_date || !end_date) {
        return res.status(400).json({ error: "All fields are required" });
    }

    db.run(
        `INSERT INTO budgets (amount, period, start_date, end_date) 
         VALUES (?, ?, ?, ?)`,
        [amount, period, start_date, end_date],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                id: this.lastID,
                amount,
                period,
                start_date,
                end_date
            });
        }
    );
};


// =====================
// UPDATE BUDGET
// =====================
export const updateBudget = (req, res) => {
    const { id } = req.params;
    const { amount, period, start_date, end_date } = req.body;

    db.run(
        `UPDATE budgets 
         SET amount = ?, period = ?, start_date = ?, end_date = ? 
         WHERE id = ?`,
        [amount, period, start_date, end_date, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ error: "Budget not found" });
            }

            res.json({
                message: "Budget updated successfully",
                id,
                amount,
                period,
                start_date,
                end_date
            });
        }
    );
};


// =====================
// DELETE BUDGET
// =====================
export const deleteBudget = (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM budgets WHERE id = ?",
        [id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ error: "Budget not found" });
            }

            res.json({
                message: "Budget deleted successfully"
            });
        }
    );
};