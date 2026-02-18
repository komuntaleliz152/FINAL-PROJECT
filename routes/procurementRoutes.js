const express = require("express");
const router = express.Router();
const Procurement = require("../models/Procurement");
const { isAuthenticated, isManager } = require("../middleware/auth");
const { validateProcurement } = require("../middleware/validation");

// Get procurement list
router.get('/procurementlist', isAuthenticated, isManager, async (req, res) => {
  try {
    const procurements = await Procurement.find().sort({ date: -1, time: -1 });
    const year = new Date().getFullYear();
    res.render('procurementlist', { procurements, year });
  } catch (err) {
    console.error('Error fetching procurement data:', err);
    res.status(500).send('Error loading procurement list');
  }
});

// Get add procurement form
router.get('/addprocurement', isAuthenticated, isManager, (req, res) => {
  res.render('addprocurement');
});

// Post new procurement
router.post('/addprocurement', isAuthenticated, isManager, validateProcurement, async (req, res) => {
  try {
    // Remove commas from cost before saving
    if (req.body.cost) {
      req.body.cost = parseFloat(req.body.cost.toString().replace(/,/g, ''));
    }
    
    const newProcurement = new Procurement(req.body);
    await newProcurement.save();
    res.redirect('/procurementlist');
  } catch (error) {
    console.error("Error saving procurement:", error);
    res.status(500).send('Error saving procurement');
  }
});

// Get update procurement form
router.get("/UpdateProduceProcurement/:id", isAuthenticated, isManager, async (req, res) => {
  try {
    const procurement = await Procurement.findById(req.params.id);
    if (!procurement) {
      return res.status(404).send("Procurement not found");
    }
    res.render("UpdateProcurement", { procurement });
  } catch (error) {
    console.error("Error fetching procurement:", error);
    res.status(500).send("Error loading procurement");
  }
});

// Update procurement
router.post("/UpdateProduceProcurement/:id", isAuthenticated, isManager, validateProcurement, async (req, res) => {
  try {
    // Remove commas from cost before saving
    if (req.body.cost) {
      req.body.cost = parseFloat(req.body.cost.toString().replace(/,/g, ''));
    }
    
    await Procurement.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/procurementlist");
  } catch (error) {
    console.error("Error updating procurement:", error);
    res.status(500).send("Error updating procurement");
  }
});

// Delete procurement
router.post("/delete-procurement", isAuthenticated, isManager, async (req, res) => {
  try {
    await Procurement.deleteOne({ _id: req.body.id });
    res.redirect("/procurementlist");
  } catch (error) {
    console.error("Error deleting procurement:", error);
    res.status(500).send("Error deleting procurement");
  }
});

module.exports = router;
