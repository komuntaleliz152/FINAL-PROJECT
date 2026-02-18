const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");
const { isAuthenticated, isManager } = require("../middleware/auth");
const { validateStock } = require("../middleware/validation");

// ROUTE: Stock Management Dashboard
router.get("/stockmanagement", isAuthenticated, isManager, (req, res) => {
    res.render("stockmanagement");
});

// ROUTE: View Stock List
router.get("/stocklist", isAuthenticated, isManager, async (req, res) => {
    try {
        const stocks = await Stock.find().sort({ date: -1, time: -1 });
        res.render("stocklist", { stocks });
    } catch (error) {
        console.error("Error retrieving stock:", error);
        res.status(500).send("Unable to retrieve stock from the database");
    }
});

// ROUTE: Form page to add stock
router.get("/addstock", isAuthenticated, isManager, (req, res) => {
    res.render("addstock");
});

// ROUTE: Save new stock (POST)
router.post("/addstock", isAuthenticated, isManager, validateStock, async (req, res) => {
    console.log("Adding stock:", req.body);
    try {
        // Remove commas from cost and sellingprice if they exist
        if (req.body.cost) {
            req.body.cost = parseFloat(req.body.cost.toString().replace(/,/g, ''));
        }
        if (req.body.sellingprice) {
            req.body.sellingprice = parseFloat(req.body.sellingprice.toString().replace(/,/g, ''));
        }
        
        const newStock = new Stock(req.body);
        await newStock.save();
        console.log("Stock saved successfully");
        res.redirect("/stocklist");
    } catch (error) {
        console.error("Error saving stock:", error);
        res.status(500).send("Unable to save stock to DB: " + error.message);
    }
});

// ROUTE: Display form to update stock by ID
router.get("/UpdateStock/:id", isAuthenticated, isManager, async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) {
            return res.status(404).send("Stock not found");
        }
        res.render("UpdateStock", { stock });
    } catch (error) {
        console.error("Error retrieving stock:", error);
        res.status(500).send("Server error while retrieving the stock");
    }
});

// ROUTE: Handle form submission to update stock
router.post("/UpdateStock/:id", isAuthenticated, isManager, validateStock, async (req, res) => {
    try {
        // Remove commas from cost and sellingprice if they exist
        if (req.body.cost) {
            req.body.cost = parseFloat(req.body.cost.toString().replace(/,/g, ''));
        }
        if (req.body.sellingprice) {
            req.body.sellingprice = parseFloat(req.body.sellingprice.toString().replace(/,/g, ''));
        }
        
        await Stock.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/stocklist");
    } catch (error) {
        console.error("Error updating stock:", error);
        res.status(400).send("Unable to update the stock");
    }
});

// ROUTE: Delete stock
router.post("/deleteStock", isAuthenticated, isManager, async (req, res) => {
    try {
        console.log("Deleting stock:", req.body);
        await Stock.deleteOne({ _id: req.body._id });
        res.redirect("/stocklist");
    } catch (error) {
        console.error("Error deleting stock:", error);
        res.status(400).send("Unable to delete the stock");
    }
});

module.exports = router;
