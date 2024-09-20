const  mongoose = require('mongoose')
const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:3
    },
    recipe: String,
    image: String,
    category: String,
    price: Number
  });
  

const Menu=mongoose.model("Menu",menuSchema)

module.exports= Menu