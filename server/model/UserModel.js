const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      // required: true,
    },
    lastname: {
      type: String,
      // required: true,
    },
    orders: [
      {
        date: {
          type: String,
        },
        order_id: {
          type: String,
        },
        order_items: [
          {
            id: {
              type: String,
            },
            price: {
              type: Number,
            },
            value: {
              type: String,
            },
            label: {
              type: String,
            },
          },
        ],
        total_amount: {
          type: Number,
        },
        customer_address: {
          type: String,
        },
        customer_number: {
          type: Number,
        },
        order_status: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
