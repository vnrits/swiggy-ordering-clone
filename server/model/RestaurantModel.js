const mongoose = require("mongoose");

const restaurantModel = new mongoose.Schema(
  {
    name: {
      type: String,
      //   required: true,
    },
    foodItems: [String],
    deliveryTime: {
      type: Number,
      //   required: true,
    },
    onlineDelivery: {
      type: Boolean,
      //   required: true,
    },
    price: {
      type: Number,
      //   required: true,
    },
    rating: {
      type: Number,
      //   required: true,
    },
    image1: {
      type: String,
      //   required: true,
    },
    image2: {
      type: String,
      //   required: true,
    },
    image3: {
      type: String,
      //   required: true,
    },
    image4: {
      type: String,
      //   required: true,
    },
    image5: {
      type: String,
      //   required: true,
    },
    location: {
      type: String,
      //   required: true,
    },
    direction: {
      type: String,
      //   required: true,
    },
    moreInfo: [String],
    foodMenu: [
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("restaurant", restaurantModel);
