import db from "../config/db.js";


// =====================
// GET ALL ACCOUNTS
// =====================
export const getAccounts = (req, res) => {
    db.all("SELECT * FROM accounts", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};


// =====================
// GET SINGLE ACCOUNT
// =====================
export const getAccountById = (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM accounts WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Account not found" });

        res.json(row);
    });
};


// =====================
// CREATE ACCOUNT
// =====================
export const createAccount = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Account name is required" });
    }

    db.run(
        "INSERT INTO accounts (name) VALUES (?)",
        [name],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                id: this.lastID,
                name
            });
        }
    );
};


// =====================
// UPDATE ACCOUNT
// =====================
export const updateAccount = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Account name is required" });
    }

    db.run(
        "UPDATE accounts SET name = ? WHERE id = ?",
        [name, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ error: "Account not found" });
            }

            res.json({
                message: "Account updated successfully",
                id,
                name
            });
        }
    );
};


// =====================
// DELETE ACCOUNT
// =====================
export const deleteAccount = (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM accounts WHERE id = ?",
        [id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ error: "Account not found" });
            }

            res.json({
                message: "Account deleted successfully"
            });
        }
    );
};