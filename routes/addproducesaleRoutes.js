 const express = require("express");
const router = express.Router();

// Import model
const ProduceSale = require("../models/ProduceSale"); // Assuming ProduceSale is your model

// Show produce sale registration form
router.get("/addProduceSale", (req, res) => {
  res.render("addProduceSale"); // Render the form where the user can add a new sale
});

// ROUTE: Save new produce sale (POST)
router.post('/addProduceSale', async (req, res) => {
    console.log('Received produce sale data:', req.body);
    try {
        // Remove commas from amount field
        if (req.body.amount) {
            req.body.amount = req.body.amount.toString().replace(/,/g, '');
        }
        
        const newProduceSale = new ProduceSale(req.body);
        await newProduceSale.save();
        console.log('Produce sale saved successfully');
        res.redirect('/produceSalesList');
    } catch (error) {
        console.error("Error saving produceSale:", error);
        console.error("Error details:", error.message);
        res.status(500).send("Unable to save produceSale to DB: " + error.message);
    }
});

// List all produce sales
router.get("/produceSalesList", async (req, res) => {
  try {
    // Fetch all produce sales from the database and sort them by most recent
    const produceSales = await ProduceSale.find().sort({ saleDateTime: -1, createdAt: -1 });
    res.render("produceSalesList", { produceSales }); // Render the list of produce sales
  } catch (error) {
    res.status(400).send("Unable to retrieve produce sales from the database");
  }
});

// Show update form for a specific sale
router.get("/UpdateProduceSale/:id", async (req, res) => {
  try {
    // Find the produce sale by ID
    const produceSale = await ProduceSale.findById(req.params.id);
    res.render("UpdateProduceSale", { produceSale }); // Render the form for updating the sale
  } catch (error) {
    console.error("Error finding produce sale:", error);
    res.status(400).send("Unable to find the produce sale to update");
  }
});

// Handle produce sale update submission
router.post("/UpdateProduceSale/:id", async (req, res) => {
  try {
    // Update the produce sale by its ID
    await ProduceSale.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/produceSalesList"); // Redirect to the list of sales after successful update
  } catch (error) {
    console.error("Error updating produce sale:", error);
    res.status(400).send("Unable to update the produce sale");
  }
});

// Delete produce sale
router.post("/produceSale/deleteSale", async (req, res) => {
  try {
    // Delete the produce sale by ID
    console.log("req.body",req.body);
    await ProduceSale.deleteOne({ _id: req.body._id });
    res.redirect("/produceSalesList"); // Redirect back to the previous page
  } catch (error) {
    res.status(400).send("Unable to delete the produce sale");
  }
});

module.exports = router;
