//defining our schema
const mongoose = require("mongoose");

const ProcurementSchema = new mongoose.Schema({
  produceName: {
    type: String,
    trim: true,
  },
  produceType: {
    type: String,
    trim: true,
  },

  tonnage: {
    type: Number,
    trim: true
  },

  cost: {
    type: Number,
    trim: true
  },
  dealerName: {
    type: String,
    trim: true
  },
  brancName: {
    type: String,
    trim: true
  },
  contact: {
    type: Number,
    trim: true,
  },

  dealerName: {
    type: String,
    trim: true,
  },
  contact: {
    type: Number,
    trim: true,
  },
  sellingPrice: {
    type: Number,
    trim: true
  },
  date: {
    type: Date,
    trim: true
  },
  time: {
    type: Number,
    trim: true
  }
});

module.exports = mongoose.model("Stock", StockSchema);