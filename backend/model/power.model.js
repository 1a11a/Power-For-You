const mongoose = require("mongoose");

const PowerSchema = new mongoose.Schema(
  {
    ps_id: {
      type: String,
      trim: true,
    },
    ps_type: {
      type: String,
      trim: true,
    },
    ps_location: {
      type: String,
      trim: true,
    },
    ps_in_charge: {
      type: String,
      trim: true,
    },
    ps_staff: {
      type: String,
      trim: true,
    },
    ps_volt: {
      type: String,
      trim: true,
    },
    ps_allo_area: {
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

module.exports = mongoose.model("power", PowerSchema);
