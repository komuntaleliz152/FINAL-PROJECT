//defining our schema
const mongoose = require("mongoose");

const ProduceSaleSchema = new mongoose.Schema({
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
  buyerName: {
    type: String,
    trim: true,
  },
  salesAgent: {
    type: String,
    trim: true
  },
  saleDateTime: {
    type: Date,
    trim: true,
  }

});

module.exports = mongoose.model("ProduceSale", ProduceSaleSchema);
