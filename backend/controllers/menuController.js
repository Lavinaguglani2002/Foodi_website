const Menu=require("../models/Menu")
const menuuser=async(req,res)=>{
    try {
        const result = await Menu.find();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching menu items' });
      }
    }
    module.exports=menuuser