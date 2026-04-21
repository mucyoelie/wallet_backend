import db from "../config/db.js";

export const getReportByDate = (req, res) => {
    const { start, end } = req.query;

    if (!start || !end) {
        return res.status(400).json({ error: "Start and end dates are required" });
    }

    db.all(
        `SELECT * FROM transactions 
         WHERE date BETWEEN ? AND ?`,
        [start, end],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
};