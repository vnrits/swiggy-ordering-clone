const User = require("../model/UserModel");
const AllOrders = require("../model/allOrdersModel");
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
    console.log(err);
  }
};

// POST
module.exports.postOrders = async (req, res) => {
  const { order_id, order_items, total_amount, customer_address, customer_number, order_status } = req.body;
  const magicId = req.magicId;
  try {
    const user = await User.findOne({ magicId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // find user email id and save it in allOrdersModel
    const user_email = user.email;
    const allOrders = new AllOrders({
      order_id,
      order_items,
      total_amount,
      customer_address,
      customer_number,
      order_status,
      user_email,
    });
    await allOrders.save();

    // Format the date to "27 Apr, 2003" string
    const formattedDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    user.orders.push({
      date: formattedDate,
      order_id,
      order_items,
      total_amount,
      customer_address,
      customer_number,
      order_status,
    });
    await user.save();
    res.status(200).json({ message: "Order placed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
