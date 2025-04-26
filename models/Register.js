//defining our schema
const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  producename: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    trim: true
  },

  quantity: {
    trim: true,
    type: Number
  },

  PricePerUnit: {
    type: Number,
    trim: true
  },
  supplierName: {
    type: String,
    trim: true
  },
  branchName: {
    type: String,
    trim: true
  },

  totalAmount: {
    type: Number,
    trim: true
  },
});


module.exports = mongoose.model("Register", RegisterSchema);
