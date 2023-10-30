const mongo=require("mongoose");

const client_schema=mongo.Schema({


    email:{
        
        type:String,

        req:[true,"email not available"],

        unique:true,

        trim:true
    
    },


    password:{
        
        type:String,
        
        req:[true,"password not available"],
        
        trim:true
    
    },


    role: {

        type: String,

        req: true,

        default: "Client",

        enum: ["Client","Admin"],


    }

},


{


    versionKey:false,


    timestamps:true


})


const client_model=mongo.model("Client",client_schema);

module.exports={client_model};