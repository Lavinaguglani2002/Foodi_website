const express = require('express');
const router = express.Router();
const {
  Cartpost,
  getCart,
  deleteCart,
  getIdCart,
  putCart
} = require('../controllers/cartController');
const verifyToken=require("../middleware/verifyToken")
// Add item to cart
router.post("/", verifyToken,Cartpost);

// Get carts by email
router.get("/", getCart);

// Get a specific cart item by ID
router.get("/:id", getIdCart);

// Delete a cart item by ID
router.delete("/:id", deleteCart);

// Update a cart item by ID
router.put("/:id", putCart);

module.exports = router;
