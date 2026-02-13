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
    type: String,
    trim: true,
  },
  dealerName: {
    type: String,
    trim: true,
  },
  branchName: {
    type: String,
    trim: true
  },
  contact: {
    type: Number,
    trim: true,
  },

  sellingprice: {
    type: Number,
    trim: true,
  },

  date: {
    type: Date,
    trim: true,
  },
  time: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Procurement", ProcurementSchema);
