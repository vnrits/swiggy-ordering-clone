const { updateOrderStatus, getAdminOrders, saveRestaurantData } = require("../controllers/AdminController");
const { getRestaurantData } = require("../controllers/RestaurantController");

const router = require("express").Router();

router.put('/updateOrderStatus', updateOrderStatus);
router.get("/getAdminOrders", getAdminOrders);
router.get("/getRestaurantData", getRestaurantData);
router.post("/saveRestaurantData", saveRestaurantData);

module.exports = router;
