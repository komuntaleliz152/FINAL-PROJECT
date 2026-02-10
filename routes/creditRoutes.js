const express = require("express");
const router = express.Router();

// Import model
const Credit = require("../models/Credit");

// Show produce sale registration form
router.get("/addCreditSale", (req, res) => {
  res.render("addCreditSale"); 
});

// ROUTE: Save new procurement (POST)
router.post('/addCreditSale', async (req, res) => {
    console.log(req.body);
    try {
        const newCredit = new Credit(req.body);
        await newCredit.save();
        res.redirect('/CreditSalesList');
    } catch (error) {
        console.error("Error saving CreditSale:", error);
        res.status(500).send("Unable to save CreditSale to DB");
    }
});

// List all produce sales
router.get("/CreditSalesList", async (req, res) => {
  try {
    // Fetch all produce sales from the database and sort them by most recent
    const creditSales = await Credit.find().sort({ dispatchDate: -1, createdAt: -1 });
    res.render("CreditSaleList", { creditSales }); // Render the list of produce sales
  } catch (error) {
    console.error("Error fetching credit sales:", error);
    res.status(400).send("Unable to retrieve credit sales from the database");
  }
});

// Show update form for a specific credit sale
router.get("/UpdateCrediteSale/:id", async (req, res) => {
  try {
    const creditSale = await Credit.findById(req.params.id);
    if (!creditSale) {
      return res.status(404).send("Credit sale not found");
    }
    res.render("UpdateCreditSale", { creditSale });
  } catch (error) {
    console.error("Error finding credit sale:", error);
    res.status(400).send("Unable to find the credit sale to update");
  }
});

// Handle credit sale update submission
router.post("/UpdateCrediteSale/:id", async (req, res) => {
  try {
    await Credit.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/CreditSalesList");
  } catch (error) {
    console.error("Error updating credit sale:", error);
    res.status(400).send("Unable to update the credit sale");
  }
});

// Delete credit sale
router.post("/creditSale/delete-creditSale", async (req, res) => {
  try {
    console.log("Deleting credit sale:", req.body);
    await Credit.deleteOne({ _id: req.body._id });
    res.redirect("/CreditSalesList");
  } catch (error) {
    console.error("Error deleting credit sale:", error);
    res.status(400).send("Unable to delete the credit sale");
  }
});

module.exports = router;