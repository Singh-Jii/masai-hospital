const { doctor_model} = require("../model/doctor_model");

const plus_doc = async (request, response) => {

  const {name,image,specialization,experience,location,date,slots,fee}= request.body;

  try {


    const docx = new doctor_model({name,image,specialization,experience,location,date,slots,fee});

    await docx.save();

    response.status(200).send({ success: true, msg: "Doctor added" });


  } 
  
  catch (er) {

    response.status(400).send({ er: er.msg });

  }

};



const edit_doc = async (request, response) => {

  const docId = request.params.id;

  const update_doc_datas = request.body;


  try {

    const docx = await doctor_model.findByIdAndUpdate(docId, update_doc_datas, {

        new: true,

      })


      response.status(200).send({ success: true, msg: "Doctor edited" });

  } 
  
  catch (er) {

    response.status(400).send({ er: er.msg });


  }

};



const delete_doc = async (request, response) => {

    const docId = request.params.id;


  try {

    let loviidovii=await doctor_model.findByIdAndDelete(docId);

    response.status(200).send({ success: true, msg: "doctor data deleted" });

  } 
  
  catch (er) {

    response.status(400).send({ er: er.msg });

  }


};



const get_doc = async (request, response) => {

  let{name,specialization,sorted_date}=request.query;


  try {

    name=new RegExp(name,'p');

    specialization=new RegExp(specialization,'p');

    
    if(sorted_date==='asc'){

      sorted_date=1;

    }
    
    else if(sorted_date==='desc'){

      sorted_date=-1;

    }


    if(sorted_date){


      item=await doctor_model.find({name,specialization}).sort({date:sorted_date});


    }
    
    
    else{


      item=await doctor_model.find({name,specialization});


    }


    response.status(200).send({ success: true,item:item,msg:"data data renderd completely"});


} 


catch (er) {


    response.status(400).send({ er: er.msg });

}


};


module.exports = { plus_doc, edit_doc, delete_doc, get_doc };
