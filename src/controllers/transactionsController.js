import db from "../config/db.js";

export const getTransactions = (req, res) => {
    db.all("SELECT * FROM transactions ORDER BY date DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

export const createTransaction = (req, res) => {
    const { account_id, category_id, subcategory_id, type, amount, description, date } = req.body;

    db.run(
        `INSERT INTO transactions (account_id, category_id, subcategory_id, type, amount, description, date)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [account_id, category_id, subcategory_id, type, amount, description, date],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
};