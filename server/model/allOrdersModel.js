const mongoose = require("mongoose");

const allOrdersSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    customer_address: {
      type: String,
      required: true,
    },
    customer_number: {
      type: Number,
      required: true,
    },
    order_status: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AllOrders", allOrdersSchema);