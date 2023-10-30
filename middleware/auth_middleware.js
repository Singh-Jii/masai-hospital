require("dotenv").config();

const {client_model}=require("../model/client_model");

const {black_list_model}=require("../model/black_list_model");

const jot=require("jsonwebtoken");


const authenticate=async(request,response,next)=>{


    const token=request.headers.token;


    if(token){


        try {

           const is_blcked= await black_list_model.findOne({token});


           if(is_blcked){

            return response.status(401).send({"success":false,"er": "Session Expired, try to login again"});

           }
           

           let  dt = jot.verify(token, process.env.at);
           
           request.body.clientID=dt.clientID;

           request.body.role = dt.role;


                next();


        } 
        
        
        catch (er) {


            response.status(400).send({"er":er.msg});


        }

    }
    
    
    else{


        return response.status(400).send({ "success":false,"er": "start login" });


    }


}

module.exports={authenticate};