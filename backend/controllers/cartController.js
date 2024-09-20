const Cart = require("../models/Cart");
const { ObjectId } = require('mongodb');

// Add item to cart
const Cartpost = async (req, res) => {
  const cartItem = req.body;
  try {
    const result = await Cart.create(cartItem);
    console.log('Item added to cart:', result);
    return res.status(201).send({ insertedId: result._id });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).send({ message: 'Error adding item to cart', error: error.message });
  }
};

// Get carts by email
const getCart = async (req, res) => {
  const email = req.query.email;
  try {
    const result = await Cart.find({ email });
    if (result.length === 0) {
      return res.status(404).send({ message: 'No cart items found for this email' });
    }
    return res.send(result);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).send({ message: 'Error fetching cart items', error: error.message });
  }
};

// Delete cart item by ID
const deleteCart = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Cart.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      return res.send({ message: 'Item deleted successfully' });
    } else {
      return res.status(404).send({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return res.status(500).send({ message: 'Error deleting cart item', error: error.message });
  }
};

// Get cart item by ID
const getIdCart = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Cart.findById(id);
    if (result) {
      return res.send(result);
    } else {
      return res.status(404).send({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error fetching cart item:', error);
    return res.status(500).send({ message: 'Error fetching cart item', error: error.message });
  }
};

// Update cart item by ID
const putCart = async (req, res) => {
  const id = req.params.id;
  const { quantity } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid cart ID" });
  }

  if (typeof quantity !== 'number' || quantity < 1) {
    return res.status(400).send({ error: "Invalid quantity" });
  }

  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { quantity: parseInt(quantity, 10) },
  };

  try {
    const result = await Cart.updateOne(filter, updateDoc);

    if (result.modifiedCount === 0) {
      return res.status(404).send({ error: "Cart item not found or not updated" });
    }

    return res.json({ message: "Cart updated successfully", result });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return res.status(500).send({ error: "An error occurred while updating the cart", error: error.message });
  }
};

module.exports = {
  Cartpost,
  getCart,
  deleteCart,
  getIdCart,
  putCart,
};
