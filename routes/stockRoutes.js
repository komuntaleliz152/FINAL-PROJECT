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

// Display form to update a specific procurement by ID
router.get("/UpdateProduceProcurement/:id", async (req, res) => {
    try {
      const produceProcurement = await Procurement.findById(req.params.id);
      if (!produceProcurement) {
        return res.status(404).send("Procurement not found");
      }
      res.render("UpdateProcurement", { produceProcurement });
    } catch (error) {
      console.error("Error retrieving procurement:", error);
      res.status(500).send("Server error while retrieving the procurement");
    }
  });
  
  // Handle form submission to update procurement
  router.post("/UpdateProduceProcurement/:id", async (req, res) => {
    try {
      await Procurement.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/procurementlist");
    } catch (error) {
      console.error("Error updating procurement:", error);
      res.status(400).send("Unable to update the procurement");
    }
  });
  

// Delete procurement
router.post("/delete-procurement", async (req, res) => {
  try {
    // Delete the procurement by ID
    await Procurement.deleteOne({ _id: req.body.id });
    res.redirect("/procurementlist");
  } catch (error) {
    console.error("Error deleting procurement:", error);
    res.status(400).send("Unable to delete the procurement");
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
    res.render("addstock");
});

// ROUTE: Save new stock (POST)
router.post("/addstock", async (req, res) => {
    console.log("Adding stock:", req.body);
    try {
        // Remove commas from cost and sellingprice if they exist
        if (req.body.cost) {
            req.body.cost = req.body.cost.toString().replace(/,/g, '');
        }
        if (req.body.sellingprice) {
            req.body.sellingprice = req.body.sellingprice.toString().replace(/,/g, '');
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

// ROUTE: Delete stock
router.post("/deleteStock", async (req, res) => {
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
