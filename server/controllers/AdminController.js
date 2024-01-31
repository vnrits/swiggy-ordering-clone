const AllOrdersModel = require("../model/allOrdersModel");
const RestaurantModel = require("../model/RestaurantModel");
const User = require("../model/UserModel");
require("dotenv").config();

// GET
module.exports.getAdminOrders = async (req, res) => {
  try {
    const allOrders = await AllOrdersModel.find();
    if (!allOrders) {
      return res.status(400).json({ message: "No orders found" });
    }
    return res.status(200).json({ data: allOrders });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// UPDATE
module.exports.updateOrderStatus = async (req, res) => {
  const { order_id, user_email, order_status } = req.body;

  try {
    // Step 1: Find the user
    const user = await User.findOne({ email: user_email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Step 2 : Find the order by ID
    const updatedOrder = await AllOrdersModel.findOneAndUpdate(
      { order_id },
      { order_status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(400).json({ message: "Order not found" });
    }

    // Step 3 : Update the order status in user model
    const userOrder = user.orders.find((order) => order.order_id === order_id);
    userOrder.order_status = order_status;
    await user.save();
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
    rating,
    image1,
    image2,
    image3,
    image4,
    image5,
    location,
    direction,
    moreInfo,
    foodMenu,
  } = req.body;

  try {
    const restaurantData = new RestaurantModel({
      name,
      foodItems,
      deliveryTime,
      onlineDelivery,
      price,
      rating,
      image1,
      image2,
      image3,
      image4,
      image5,
      location,
      direction,
      moreInfo,
      foodMenu,
    });

    await restaurantData.save();
    res.status(200).json({ message: "Restaurant data saved successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
