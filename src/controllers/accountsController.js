import db from "../config/db.js";

export const getAccounts = (req, res) => {
    db.all("SELECT * FROM accounts", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

export const createAccount = (req, res) => {
    const { name } = req.body;

    db.run("INSERT INTO accounts (name) VALUES (?)", [name], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name });
    });
};