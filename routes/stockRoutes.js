const express = require("express");
const router = express.Router();
const Procurement = require("../models/Procurement"); // Make sure you require your model
const Stock = require("../models/Procurement"); // And the Stock model


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
router.get('/procurementlist', async (req, res) => {
    try {
        const procurements = await Procurement.find().sort({ date: -1, time: -1 });
        console.log("Fetched procurements:", procurements); // Log the fetched procurements
        const year = new Date().getFullYear(); // Pass the year
        res.render('procurementlist', { procurements, year });
    } catch (err) {
        console.error('Error fetching procurement data:', err);
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
        res.status(500).send("Unable to retrive procuce procurement from the DB");
    }
});

// Display form to update a specific ProduceProcurement by ID
router.get("/UpdateProduceProcurement/:id", async (req, res) => {
    try {
      const produceProcurement = await ProduceProcurement.findById(req.params.id);
      if (!produceProcurement) {
        return res.status(404).send("Produce procurement not found");
      }
      res.render("/UpdateProduceProcurement", { produceProcurement });
    } catch (error) {
      res.status(500).send("Server error while retrieving the produce procurement");
    }
  });
  
  // Handle form submission to update ProduceProcurement
  router.post("/UpdateProduceProcurement/:id", async (req, res) => {
    try {
      await ProduceProcurement.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/procurementlist");
    } catch (error) {
      res.status(400).send("Unable to update the produce procurement");
    }
  });
  

// Delete produce procurement
router.post("/produceProcurement/deleteProduceProcurement", async (req, res) => {
  try {
    // Delete the produce procurement by ID
    await ProduceProcurement.deleteOne({ _id: req.body.id });
    res.redirect("back"); // Redirect back to the previous page
  } catch (error) {
    res.status(400).send("Unable to delete the produce procurement");
  }
});

// ROUTE: Stock Management Dashboard
router.get("/stockmanagement", (req, res) => {
    res.render("stockmanagement");
});

// ROUTE: View Stock List
router.get("/stocklist", async (req, res) => {
    try {
        const stocks = await Stock.find().sort({ date: -1, time: -1 });
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

// ROUTE: Display form to update stock by ID
router.get("/UpdateStock/:id", async (req, res) => {
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
router.post("/UpdateStock/:id", async (req, res) => {
    try {
        await Stock.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/stocklist");
    } catch (error) {
        console.error("Error updating stock:", error);
        res.status(400).send("Unable to update the stock");
    }
});

module.exports = router;
