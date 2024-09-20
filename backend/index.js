const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const cors = require('cors');
require('dotenv').config();

const menuRoute=require("./routes/menuRoute")
const cartRoute=require("./routes/cartRoute")
const userRoute=require('./routes/userRoute')

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URL
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/foodi-client";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.log('MongoDB connection error: ', err);
});
app.post("/jwt",async(req,res)=>{
  const user=req.body;
  const token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:"1hr"
  })
  res.send({token})
})

app.use("/menu",menuRoute)
app.use("/carts",cartRoute)
app.use("/users",userRoute)

app.get("/", (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
