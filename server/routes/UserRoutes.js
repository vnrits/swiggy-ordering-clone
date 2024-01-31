const express = require("express");
const { getOrders, postOrders } = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/getOrders", authMiddleware, getOrders); 
router.post("/postOrders", authMiddleware, postOrders); 

module.exports = router;
