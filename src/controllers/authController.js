import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// SIGNUP
export const signup = (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    `INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)`,
    [fullname, email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(400).json({ error: "Email already exists" });
      }
      res.json({ message: "Signup successful", userId: this.lastID });
    }
  );
};

// LOGIN
export const login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, fullname: user.fullname, email: user.email },
    });
  });
};

// LOGOUT
export const logout = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // Blacklist the token
  db.run(
    `INSERT INTO token_blacklist (token) VALUES (?)`,
    [token],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    }
  );
};