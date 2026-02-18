const express = require("express");
const router = express.Router();
const ProduceSale = require("../models/ProduceSale");
const Stock = require("../models/Stock");
const Procurement = require("../models/Procurement");
const { isAuthenticated, isManager } = require("../middleware/auth");

// Manager Dashboard route
router.get("/ManagerDashboard", isAuthenticated, isManager, async (req, res) => {
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

    // Get recent procurement orders (last 5)
    const recentOrders = await Procurement.find()
      .sort({ date: -1 })
      .limit(5)
      .select("produceName tonnage");

    // Get available stock (top 5 by quantity)
    const availableStock = await Stock.aggregate([
      {
        $group: {
          _id: "$produceName",
          totalStock: { $sum: "$tonnage" }
        }
      },
      { $sort: { totalStock: -1 } },
      { $limit: 5 }
    ]);

    // Get weekly sales for the last 4 weeks
    const weeklySalesData = [];
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (i * 7 + 6));
      const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (i * 7));
      
      const sales = await ProduceSale.aggregate([
        { $match: { saleDateTime: { $gte: weekStart, $lte: weekEnd } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);
      
      weeklySalesData.push(sales[0]?.total || 0);
    }

    // Get inventory levels by product
    const inventoryData = await Stock.aggregate([
      {
        $group: {
          _id: "$produceName",
          totalStock: { $sum: "$tonnage" }
        }
      },
      { $sort: { totalStock: -1 } },
      { $limit: 5 }
    ]);

    res.render("managersDashboard", {
      todaySales: todaySales[0]?.total || 0,
      topProduct: topProduct[0] || null,
      currentProducts: currentProducts,
      lowStockItems: lowStockItems,
      recentOrders: recentOrders,
      availableStock: availableStock,
      weeklySalesData: JSON.stringify(weeklySalesData),
      inventoryData: JSON.stringify(inventoryData)
    });
  } catch (err) {
    console.error("Failed to load manager dashboard:", err);
    res.status(500).send("Dashboard error");
  }
});

// Alternative route for backward compatibility
router.get("/managerDash", isAuthenticated, isManager, async (req, res) => {
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

    // Get recent procurement orders (last 5)
    const recentOrders = await Procurement.find()
      .sort({ date: -1 })
      .limit(5)
      .select("produceName tonnage");

    // Get available stock (top 5 by quantity)
    const availableStock = await Stock.aggregate([
      {
        $group: {
          _id: "$produceName",
          totalStock: { $sum: "$tonnage" }
        }
      },
      { $sort: { totalStock: -1 } },
      { $limit: 5 }
    ]);

    // Get weekly sales for the last 4 weeks
    const weeklySalesData = [];
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (i * 7 + 6));
      const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (i * 7));
      
      const sales = await ProduceSale.aggregate([
        { $match: { saleDateTime: { $gte: weekStart, $lte: weekEnd } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);
      
      weeklySalesData.push(sales[0]?.total || 0);
    }

    // Get inventory levels by product
    const inventoryData = await Stock.aggregate([
      {
        $group: {
          _id: "$produceName",
          totalStock: { $sum: "$tonnage" }
        }
      },
      { $sort: { totalStock: -1 } },
      { $limit: 5 }
    ]);

    res.render("managersDashboard", {
      todaySales: todaySales[0]?.total || 0,
      topProduct: topProduct[0] || null,
      currentProducts: currentProducts,
      lowStockItems: lowStockItems,
      recentOrders: recentOrders,
      availableStock: availableStock,
      weeklySalesData: JSON.stringify(weeklySalesData),
      inventoryData: JSON.stringify(inventoryData)
    });
  } catch (err) {
    console.error("Failed to load manager dashboard:", err);
    res.status(500).send("Dashboard error");
  }
});

module.exports = router; 