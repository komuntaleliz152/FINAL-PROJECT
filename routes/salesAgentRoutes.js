const express = require("express");
const router = express.Router();
const ProduceSale = require("../models/ProduceSale");
const Stock = require("../models/Stock");
const Credit = require("../models/Credit");

router.get("/salesAgentDash", async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Get today's sales
    const todaySales = await ProduceSale.aggregate([
      { $match: { saleDateTime: { $gte: startOfToday } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Get high selling product (top product by sales amount)
    const topProduct = await ProduceSale.aggregate([
      {
        $group: {
          _id: "$produceName",
          totalSales: { $sum: "$amount" }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 1 }
    ]);

    // Get all unique products in stock
    const currentProducts = await Stock.distinct("produceName");

    // Get low stock items (less than 1000 kgs)
    const lowStockItems = await Stock.aggregate([
      {
        $group: {
          _id: "$produceName",
          totalStock: { $sum: "$tonnage" }
        }
      },
      { $match: { totalStock: { $lt: 1000 } } },
      { $sort: { totalStock: 1 } },
      { $limit: 5 }
    ]);

    // Get recent credit sales (last 5)
    const recentOrders = await Credit.find()
      .sort({ dispatchDate: -1 })
      .limit(5)
      .select("buyerName contact amountDue dispatchDate");

    res.render("salesAgentDashboard", {
      todaySales: todaySales[0]?.total || 0,
      topProduct: topProduct[0] || null,
      currentProducts: currentProducts,
      lowStockItems: lowStockItems,
      recentOrders: recentOrders
    });
  } catch (err) {
    console.error("Failed to load sales agent dashboard:", err);
    res.status(500).send("Dashboard error");
  }
});

module.exports = router;

