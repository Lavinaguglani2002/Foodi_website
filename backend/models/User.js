const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        trim:true,
        minlength:3
    },
    photoURL:String,
    role:{
        type:String,
        enum:['user','admin'],
        default:"user"
    }
})
const User=mongoose.model('User',userSchema)
module.exports=User