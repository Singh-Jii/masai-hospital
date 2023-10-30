require("dotenv").config();


const mongo=require("mongoose");


const my_connect=mongo.connect(process.env.mongolink);


module.exports={my_connect};