const mongo=require("mongoose");

const black_schema=mongo.Schema({


    token: {

        type: String,

        req: true,

        unique: true,

    },


},


{

    versionKey : false,

    timestamps :true

});


const black_list_model=mongo.model("blacklist",black_schema);


module.exports={black_list_model};