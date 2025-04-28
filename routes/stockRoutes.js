
const express = require("express");
const router = express.Router();
const Procurement = require("../models/Procurement"); // Make sure you require your model
const Stock = require("../models/Procurement"); // And the Stock model


router.get('/procurementlist', async (req, res) => {
    try {
        const procurements = await Procurement.find();
        console.log("Fetched procurements:", procurements); // Log the fetched procurements
        const year = new Date().getFullYear(); // Pass the year
        res.render('procurementlist', { procurements, year });
    } catch (err) {
        console.error('Error fetching procurement data:', err);
        res.status(500).send('Internal Server Error');
    }
});


// ROUTE: View Stock
router.get('/stock', async (req, res) => {
    try {
        const procurement = await Procurement.find();
        res.render('stock', { procurement }); 
    } catch (err) {
        console.error('Error fetching stock data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE: Form page to add procurement
router.get('/addprocurement', (req, res) => {
    res.render('addprocurement'); 
});

// ROUTE: Save new procurement (POST)
router.post('/addprocurement', async (req, res) => {
    console.log(req.body);
    try {
        const newProcurement = new Procurement(req.body);
        await newProcurement.save();
        res.redirect('/procurementlist');
    } catch (error) {
        console.error("Error saving procurement:", error);
        res.status(500).send("Unable to save procurement to DB");
    }
});

// ROUTE: Stock Management Dashboard
router.get("/stockmanagement", (req, res) => {
    res.render("stockmanagement");
});

// ROUTE: View Stock List
router.get("/stocklist", async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.render("stocklist", { stocks });
    } catch (error) {
        console.error("Error retrieving stock:", error);
        res.status(500).send("Unable to retrieve stock from the database");
    }
});

// ROUTE: Form page to add stock
router.get("/addstock", (req, res) => {
    res.render("Addstock");
});

module.exports = router;

















