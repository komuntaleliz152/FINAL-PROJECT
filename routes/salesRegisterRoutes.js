const express = require("express");
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Import model
const Sale = require("../models/Sale");

// Show sale registration form
router.get("/addSale", (req, res) => {
  res.render("addSale");
});

// Handle sale registration form submission
router.post("/Saleregister", async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.redirect("/Saleregister");
  } catch (error) {
    console.error("Error saving sale:", error);
    res.status(400).send("Unable to save sale");
  }
});

// List all sales
router.get("/salesList", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ $natural: -1 });
    res.render("salesList", { sales });
  } catch (error) {
    res.status(400).send("Unable to retrieve sales from the database");
  }
});

// Show update form
router.get("/updateSale/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    res.render("updateSale", { sale: updateSale});
  } catch (error) {
    res.status(400).send("Unable to update the sale");
  }
});

// Handle update submission
router.post("/updateSale", async (req, res) => {
  try {
    await Sale.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/salesList");
  } catch (error) {
    res.status(400).send("Unable to update the sale");
  }
});

// Delete sale
router.post("/sales/deleteSale", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    await Sale.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete the sale");
  }
});

module.exports = router;
