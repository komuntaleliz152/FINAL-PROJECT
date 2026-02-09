const express = require("express");
const router = express.Router();

// Manager Dashboard route
router.get("/ManagerDashboard", (req, res) => {
  res.render("managersDashboard");
});

// Alternative route for backward compatibility
router.get("/managerDash", (req, res) => {
  res.render("managersDashboard");
});

module.exports = router; 