//defining our schema
const mongoose = require("mongoose");

const ProduceSchema = new mongoose.Schema({
  produceName: {
    type: String,
    trim: true,
  },
  tonnage: {
    trim: true,
    type: Number,
  },

  amount: {
    type: Number,
    trim: true,
  },
  buyername: {
    type: String,
    trim: true,
  },
  salesAgent: {
    type: String,
    trim: true
  },
  saleDateTime: {
    type: String,
    trim: true,
  },

});

module.exports = mongoose.model("Produce", ProduceSchema);
