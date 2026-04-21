import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // Check if token is blacklisted
  db.get(`SELECT * FROM token_blacklist WHERE token = ?`, [token], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (row) {
      return res.status(401).json({ error: "Token has been invalidated. Please login again." });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      req.user = decoded; // attach user to request
      next();
    });
  });
};