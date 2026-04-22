import db from "../config/db.js";

// GET ALL categories
export const getCategories = (req, res) => {
  db.all(
    `SELECT * FROM categories WHERE user_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// CREATE
export const createCategory = (req, res) => {
  const { name } = req.body;

  db.run(
    `INSERT INTO categories (user_id, name) VALUES (?, ?)`,
    [req.user.id, name],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ id: this.lastID, name });
    }
  );
};

// UPDATE
export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db.run(
    `UPDATE categories SET name = ? WHERE id = ? AND user_id = ?`,
    [name, id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0)
        return res.status(404).json({ error: "Category not found" });

      res.json({ message: "Category updated", id, name });
    }
  );
};

// DELETE
export const deleteCategory = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM categories WHERE id = ? AND user_id = ?`,
    [id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0)
        return res.status(404).json({ error: "Category not found" });

      res.json({ message: "Category deleted" });
    }
  );
};