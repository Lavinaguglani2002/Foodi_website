const express=require('express')
const mongoose=require('mongoose')
const cartSchema = new mongoose.Schema({
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    name: String,
    quantity: { type: Number, default: 1 },
    image: String,
    price: Number,
    email: String
  });
  const Cart = mongoose.model('Cart', cartSchema);
  module.exports=Cart
  