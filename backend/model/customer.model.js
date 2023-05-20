const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    c_id: {
      type: String,
      trim: true,
    },
    c_full_name: {
      type: String,
      trim: true,
    },
    c_address: {
      type: String,
      trim: true,
    },
    c_email: {
      type: String,
      trim: true,
    },
    c_residenship: {
      type: String,
      trim: true,
    },
    c_area_id: {
      type: String,
      trim: true,
    },
    c_contact: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("customer", CustomerSchema);
