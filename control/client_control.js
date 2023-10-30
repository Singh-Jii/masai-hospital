const {client_model}=require("../model/client_model");

const {black_list_model}=require("../model/black_list_model");

require("dotenv").config();

const crypted=require("bcrypt");

const jot=require("jsonwebtoken");


const clientSignup=async (request,response)=>{


    let {email,password,role}=request.body;


    try {


        let Client=await client_model.findOne({email});


        if(Client){


            return response.status(409).send({ "success":false,"er": "already erxisted try another login credential" });


        }
        

        const privacy = crypted.hashSync(password, 9);


        let new_client=new client_model({email,password:privacy,role});


        console.log(new_client);


        await new_client.save();


        response.status(200).send({ "success": true, "msg": "client registeration completed"});


    } 
    
    catch (er) {


        response.status(400).send({"er":er.msg});


    }


}



const clientLogin = async (request, response) => {


    let { email, password } = request.body;
  


    try {


      const Client = await client_model.findOne({ email });


      if (!Client) {

        return response.status(401).send({ success: false, err: 'err' });



      }
  

      crypted.compare(password, Client.password, function (er, output) {


        if (er) {


          return response.status(500).send({ success: false, er: 'err' });

        }

  
        if (output) {


          const token = jot.sign({ clientID: Client._id, role: Client.role }, process.env.at, { expiresIn: '5d' });


          return response.status(200).send({ success: true, msg: 'Login completed', token: token });


        } 
        
        
        else {

          return response.status(401).send({ success: false, er: 'err' });


        }


      });


    } 
    
    
    
    catch (er) {


      return response.status(500).send({ success: false, er: 'err' });


    }


  };



const clientLogout=async (request,response)=>{


    let token=request.headers.token;


    try {


        const bl_Token = new black_list_model({ token });


        await bl_Token.save();


        return response.status(200).send({success:false,msg:'Logging out completed'});

    } 
    
    catch (er) {


        response.status(400).send({"er":er.msg});


    }

}


module.exports={clientSignup,clientLogin,clientLogout};