require("dotenv").config();

const exp=require("express");

const my_cors=require("cors");

const {my_connect}=require("./db/database");

const {client_router}=require("./router/client_router");

const {doctor_router}=require("./router/doctor_router");

const application=exp();

application.use(exp.json());

application.use(my_cors());


//get//


application.get("/",async(request,response)=>{

    return response.status(200).send({msg:`Hi, this is endpoint.`});

})


application.use("/",client_router);

application.use("/",doctor_router);


application.all("*",async(request,response)=>{

    return response.status(404).send("404 Error");

})


application.listen(process.env.port,async()=>{


    try {

        await my_connect;

        console.log("database connected");

    } 
    
    catch (er) {

        console.log(er.msg);

    }


    console.log(`server is running on port ${process.env.port}`);

    
})