const User = require('../models/userModel');
const{userAllAddress, createAddress} = require('../services/addressService')

const getAllAddresses = async(req, res)=>{
    const{id} = req.user
    try{
        const allAddresses = await userAllAddress(id)
        res.status(200).json({allAddresses});
    }catch(err){
        res.status(400).send({ error: err.message });
    }
}

const addAddress = async(req, res)=>{

    const newAddress = await createAddress(req, res)
    
    res.status(201).json({ message: "Address added successfully", address: newAddress }); 
 
}



module.exports = {getAllAddresses, addAddress}