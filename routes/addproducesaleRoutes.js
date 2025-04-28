const express = require("express");
const router = express.Router();

// Import model
const Produce = require("../models/Produce"); // Assuming ProduceSale is your model

// Show produce sale registration form
router.get("/addProduceSale", (req, res) => {
  res.render("addProduceSale"); // Render the form where the user can add a new sale
});

// Handle produce sale registration form submission
router.post("/addProduceSale", async (req, res) => {
  try {
    // Create a new produce sale from the submitted form data
    const addProduceSale = new addProduceSale(req.body);
    await addProduceSale.save(); // Save it to the database

    res.redirect("/SalesList"); // Redirect to the list of sales after successful registration
  } catch (error) {
    console.error("Error saving produce sale:", error);
    res.status(400).send("Unable to save produce sale");
  }
});

// List all produce sales
router.get("/produceSalesList", async (req, res) => {
  try {
    // Fetch all produce sales from the database and sort them by most recent
    const produceSales = await ProduceSale.find().sort({ $natural: -1 });
    res.render("produceSalesList", { produceSales }); // Render the list of produce sales
  } catch (error) {
    res.status(400).send("Unable to retrieve produce sales from the database");
  }
});

// Show update form for a specific sale
router.get("/updateProduceSale/:id", async (req, res) => {
  try {
    // Find the produce sale by ID
    const produceSale = await ProduceSale.findById(req.params.id);
    res.render("updateProduceSale", { produceSale }); // Render the form for updating the sale
  } catch (error) {
    res.status(400).send("Unable to find the produce sale to update");
  }
});

// Handle produce sale update submission
router.post("/updateProduceSale", async (req, res) => {
  try {
    // Update the produce sale by its ID
    await ProduceSale.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/produceSalesList"); // Redirect to the list of sales after successful update
  } catch (error) {
    res.status(400).send("Unable to update the produce sale");
  }
});

// Delete produce sale
router.post("/produceSales/deleteProduceSale", async (req, res) => {
  try {
    // Delete the produce sale by ID
    await ProduceSale.deleteOne({ _id: req.body.id });
    res.redirect("back"); // Redirect back to the previous page
  } catch (error) {
    res.status(400).send("Unable to delete the produce sale");
  }
});

module.exports = router;
