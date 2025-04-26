const express = require("express");
const router = express.Router();

//import models
const Register = require("../models/Register");

router.get("/registerProduce", (req, res) => {
  res.render("register");
});

router.post("/registerProduce", async (req, res) => {
  try {
    const produce = new Register(req.body);
    console.log(produce);
    await produce.save();
    res.redirect("/registerProduce");
  } catch (error) {
    res.status(400).render("register");
    console.log(error);
  }
}),

module.exports = router;
