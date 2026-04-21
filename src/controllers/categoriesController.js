import db from "../config/db.js";


// =====================
// GET ALL CATEGORIES
// =====================
export const getCategories = (req, res) => {
    db.all("SELECT * FROM categories", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};


// =====================
// GET CATEGORY BY ID
// =====================
export const getCategoryById = (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM categories WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Category not found" });

        res.json(row);
    });
};


// =====================
// CREATE CATEGORY
// =====================
export const createCategory = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Category name is required" });
    }

    db.run(
        "INSERT INTO categories (name) VALUES (?)",
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
// UPDATE CATEGORY
// =====================
export const updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Category name is required" });
    }

    db.run(
        "UPDATE categories SET name = ? WHERE id = ?",
        [name, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ error: "Category not found" });
            }

            res.json({
                message: "Category updated successfully",
                id,
                name
            });
        }
    );
};


// =====================
// DELETE CATEGORY
// =====================
export const deleteCategory = (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM categories WHERE id = ?",
        [id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ error: "Category not found" });
            }

            res.json({
                message: "Category deleted successfully"
            });
        }
    );
};