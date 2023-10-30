const mongo = require('mongoose');



const doc_schema = new mongo.Schema({


  name: {

    type: String,

    req: true,

  },


  image: {

    type: String,

    req: true,

  },


  specialization: {

    type: String,

    enum: ['Cardiologist', 'Dermatologist', 'Pediatrician','Psychiatrist'],

    req: true,

  },


  experience: {

    type: Number,

    req: true,

  },


  location: {

    type: String,

    req: true,

  },


  date: {

    type: Date,

    req: true,

  },


  slots: {

    type: Number,

    req: true,

  },


  fee: {

    type: Number,

    req: true,

  },


});



const doctor_model = mongo.model('Doctor', doc_schema);


module.exports = {doctor_model};