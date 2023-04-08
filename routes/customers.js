const express = require('express');
const Customers = require('../models/customers');


const router = express.Router();

//Add Customer 

router.post('/customer/add' ,(req,res) =>{
    let newCustomer = new Customers (req.body);

    newCustomer.save((err) =>{

        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Customer added successfully"
        });
    });
});

module.exports = router;