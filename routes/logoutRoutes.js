const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
  res.render("Logout" );
});



module.exports =router;