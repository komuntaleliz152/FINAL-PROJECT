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
    const creditSales = await Credit.find().sort({ $natural: -1 });
    res.render("CreditSaleList", { creditSales }); // Render the list of produce sales
  } catch (error) {
    console.error("Error fetching credit sales:", error);
    res.status(400).send("Unable to retrieve credit sales from the database");
  }
});

module.exports = router;