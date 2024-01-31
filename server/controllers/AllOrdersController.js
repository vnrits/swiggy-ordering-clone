const RestaurantModel = require("../model/RestaurantModel");
const User = require("../model/UserModel");
require("dotenv").config();

// GET
module.exports.getOrders = async (req, res) => {
  const magicId = req.magicId;
  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ data: user.orders });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST
module.exports.saveRestaurantData = async (req, res) => {
  const {
    name,
    foodItems,
    deliveryTime,
    onlineDelivery,
    price,
    image1,
    image2,
    image3,
    image4,
    image5,
    location,
    direction,
    moreInfo,
  } = req.body;

  try {
    const restaurantData = new RestaurantModel({
      name,
      foodItems,
      deliveryTime,
      onlineDelivery,
      price,
      image1,
      image2,
      image3,
      image4,
      image5,
      location,
      direction,
      moreInfo,
    });

    await restaurantData.save();
    res.status(200).json({ message: "Restaurant data saved successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
