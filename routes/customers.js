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

//get all customers

router.get('/customer',(req,res) =>{
    Customers.find().exec((err,customer) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingcustomer:customer
        });
    });
});

//get specific Customer details

router.get("/customer/:id",(req,res) =>{

    let CustomerId = req.params.id;

    Customers.findById(CustomerId,(err,Customer) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            Customer
        });
    });

    
});

//update Customer

router.put('/customer/update/:id',(req,res)=>{
    Customers.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,Customer)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Customer Updated Succesfully"
            });
        }
    );
});

//delete Customer

router.delete('/customer/delete/:id',(req,res) =>{
    Customers.findByIdAndRemove(req.params.id).exec((err,deletedcustomer) =>{

        if(err) return res.status(400).json({
            message:"Customer Delete unsuccesful",err
        });

        return res.json({
            message:"Customer Delete Succesful",deletedcustomer
        });
    });
});

module.exports = router;