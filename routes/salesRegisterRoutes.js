const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

router.post("/addSale", async (req, res) => {
  const { ProductName, Quantity, PriceperUnit, CustomerName } = req.body;

  // Calculate total sale amount
  const amount = Quantity * PriceperUnit;

  try {
    const newSale = new Sale({
      ProductName,
      Quantity,
      PriceperUnit,
      CustomerName,
      amount,
    });

    // Save to the database
    await newSale.save();

    res.redirect("/directorsDash"); // Redirect to the director's dashboard after saving the sale
  } catch (err) {
    console.error("Error recording sale:", err);
    res.status(500).send("Error recording sale");
  }
});

module.exports = router;
