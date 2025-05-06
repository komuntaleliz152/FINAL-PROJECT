const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

router.get("/directorsDash", async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Aggregate total sales for today
    const dailySales = await Sale.aggregate([
      { $match: { saleDate: { $gte: startOfToday } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Aggregate total sales for the last week
    const weeklySales = await Sale.aggregate([
      { $match: { saleDate: { $gte: startOfWeek } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Aggregate total sales for the current month
    const monthlySales = await Sale.aggregate([
      { $match: { saleDate: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.render("directorsDashboard", {
      totalSales: dailySales[0]?.total + weeklySales[0]?.total + monthlySales[0]?.total || 0,
      weeklySales: weeklySales[0]?.total || 0,
      dailySales: dailySales[0]?.total || 0,
      monthlySales: monthlySales[0]?.total || 0,
    });
  } catch (err) {
    console.error("Failed to load dashboard:", err);
    res.status(500).send("Dashboard error");
  }
});

module.exports = router;
