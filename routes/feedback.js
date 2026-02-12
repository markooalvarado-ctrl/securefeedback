const express = require("express");
const { body, validationResult } = require("express-validator");
const xss = require("xss");
const { poolPromise, sql } = require("../db/database");

const router = express.Router();

router.get("/", (req, res) => res.render("index"));

router.post("/register",
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("comment").isLength({ min: 5 }),
  async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.send("Datos inválidos");

    const name = xss(req.body.name);
    const email = xss(req.body.email);
    const comment = xss(req.body.comment);

    const pool = await poolPromise;
    await pool.request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("comment", sql.NVarChar, comment)
      .query("INSERT INTO Feedback (name,email,comment,created_at) VALUES (@name,@email,@comment,GETDATE())");

    res.redirect("/users");
});

router.get("/users", async (req, res) => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM Feedback");
  res.render("users", { users: result.recordset });
});

module.exports = router;