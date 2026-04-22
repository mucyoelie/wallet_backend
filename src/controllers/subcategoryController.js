import db from "../config/db.js";

// GET all subcategories for the user
export const getSubcategories = (req, res) => {
  db.all(
    `SELECT * FROM subcategories WHERE user_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// CREATE
export const createSubcategory = (req, res) => {
  const { category_id, name } = req.body;

  db.run(
    `INSERT INTO subcategories (user_id, category_id, name)
     VALUES (?, ?, ?)`,
    [req.user.id, category_id, name],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        id: this.lastID,
        category_id,
        name,
      });
    }
  );
};

// UPDATE
export const updateSubcategory = (req, res) => {
  const { id } = req.params;
  const { category_id, name } = req.body;

  db.run(
    `UPDATE subcategories
     SET category_id = ?, name = ?
     WHERE id = ? AND user_id = ?`,
    [category_id, name, id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (!this.changes)
        return res.status(404).json({ error: "Subcategory not found" });

      res.json({ message: "Subcategory updated" });
    }
  );
};

// DELETE
export const deleteSubcategory = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM subcategories WHERE id = ? AND user_id = ?`,
    [id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      if (!this.changes)
        return res.status(404).json({ error: "Subcategory not found" });

      res.json({ message: "Subcategory deleted" });
    }
  );
};