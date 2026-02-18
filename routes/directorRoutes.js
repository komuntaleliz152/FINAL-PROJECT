const express = require("express");
const router = express.Router();
const ProduceSale = require("../models/ProduceSale");
const { isAuthenticated, isSalesAgent } = require("../middleware/auth");

router.get("/directorsDash", async (req, res) => {
  try {
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Aggregate total sales for the last week
    const weeklySales = await ProduceSale.aggregate([
      { $match: { saleDateTime: { $gte: startOfWeek } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Aggregate total sales for the current month
    const monthlySales = await ProduceSale.aggregate([
      { $match: { saleDateTime: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Aggregate all-time total sales
    const totalSales = await ProduceSale.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Get daily sales for the last 7 days
    const dailySalesData = await ProduceSale.aggregate([
      { $match: { saleDateTime: { $gte: startOfWeek } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$saleDateTime" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get top products by sales amount
    const topProducts = await ProduceSale.aggregate([
      {
        $group: {
          _id: "$produceName",
          totalSales: { $sum: "$amount" },
          totalTonnage: { $sum: "$tonnage" }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 }
    ]);

    res.render("directorsDashboard", {
      totalSales: totalSales[0]?.total || 0,
      weeklySales: weeklySales[0]?.total || 0,
      monthlySales: monthlySales[0]?.total || 0,
      dailySalesData: JSON.stringify(dailySalesData),
      topProducts: JSON.stringify(topProducts)
    });
  } catch (err) {
    console.error("Failed to load dashboard:", err);
    res.status(500).send("Dashboard error");
  }
});

// Alternative route for consistency
router.get("/directorsDashboard", async (req, res) => {
  try {
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Aggregate total sales for the last week
    const weeklySales = await ProduceSale.aggregate([
      { $match: { saleDateTime: { $gte: startOfWeek } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Aggregate total sales for the current month
    const monthlySales = await ProduceSale.aggregate([
      { $match: { saleDateTime: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Aggregate all-time total sales
    const totalSales = await ProduceSale.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Get daily sales for the last 7 days
    const dailySalesData = await ProduceSale.aggregate([
      { $match: { saleDateTime: { $gte: startOfWeek } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$saleDateTime" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get top products by sales amount
    const topProducts = await ProduceSale.aggregate([
      {
        $group: {
          _id: "$produceName",
          totalSales: { $sum: "$amount" },
          totalTonnage: { $sum: "$tonnage" }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 }
    ]);

    res.render("directorsDashboard", {
      totalSales: totalSales[0]?.total || 0,
      weeklySales: weeklySales[0]?.total || 0,
      monthlySales: monthlySales[0]?.total || 0,
      dailySalesData: JSON.stringify(dailySalesData),
      topProducts: JSON.stringify(topProducts)
    });
  } catch (err) {
    console.error("Failed to load dashboard:", err);
    res.status(500).send("Dashboard error");
  }
});

module.exports = router;
