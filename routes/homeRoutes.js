const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/stock", (req, res) => {
  res.render("stock");
});

module.exports =router;