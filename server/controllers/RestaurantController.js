const RestaurantModel = require("../model/RestaurantModel");
require("dotenv").config();

// GET
module.exports.getRestaurantData = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    if (!restaurants) {
      return res.status(400).json({ message: "Restaurants not found" });
    }
    res.status(200).json({ data: restaurants });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
