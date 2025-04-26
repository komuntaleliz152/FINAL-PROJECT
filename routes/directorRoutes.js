const express = require("express");
const router = express.Router();

router.get("/directorsDash", (req, res) => {
  res.render("directorsDashboard");
});

module.exports =router;