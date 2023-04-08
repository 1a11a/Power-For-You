const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactnumber:{
        type:Number,
        required:true
    },
    areaid:{
        type:String,
        required:true
    },
    residenship:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Customers', customerSchema)