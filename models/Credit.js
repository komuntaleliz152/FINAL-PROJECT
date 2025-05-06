//defining our schema
const mongoose = require("mongoose");

const CreditSchema = new mongoose.Schema({
  produceName: {
    type: String,
    trim: true
  },
  produceType: {
    type: String,
    trim: true
  },

  tonnage: {
    type: Number,
    trim: true
  },
  buyerName: {
    type: String,
    trim: true
  },
  nationalId: {
    type: String,
    trim: true
  },
  contact: {
    type: Number,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },

  amountDue: {
    type: Number,
    trim: true
  },
  dueDate: {
    type: Date,
    trim: true
  },
  dispatchDate: {
    type: Date,
    trim: true,
  },
  salesAgentName: {
    type: String,
    trim: true
    },
});

module.exports = mongoose.model("Credit", CreditSchema);