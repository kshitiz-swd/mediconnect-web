const { add } = require('winston')
const Address = require('../models/addressModel')
const User = require('../models/userModel')

const userAllAddress = async(id)=>{

    const allAddresses = await Address.find({userId: id})
    return allAddresses

}

const createAddress = async(req, res)=>{
    const{ addressLine1, addressLine2, city, state, pincode} = req.body
    const userId = req.user.id

    if (!userId || !addressLine1 || !addressLine2 || !city || !state || !pincode) {
        return res.status(400).json({
          message: 'Missing required fields.'
        });
      }

      const user = await User.findOne({_id: userId})

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      const existingAddress = await Address.findOne({
        userId:userId,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        pincode: pincode
      })

      if(existingAddress){
        return res.status(400).send({ error: "Address already exists for this user." });
      }

      const newAddress = new Address({
        userId,
        addressLine1,
        addressLine2,
        city, 
        state,
        pincode
      })

      await newAddress.save()
      
      return newAddress
}

const deleteOrEditAddress = async(req, res)=>{
    const request = req.params.request
    const id = req.params.id

    if (request !== "delete" && request !== "edit") {
        return res.status(400).json({
          message: 'Invalid request type. Use "delete" or "edit".'
        });
      }

    const findAddress = await Address.findOne({id:id})

    if(!findAddress){
        return res.status(404).json({
            message: 'Address not found'
          });
    }

    if (request === "delete") {
        await Address.findOneAndDelete({ id });
        return res.status(200).json({
          message: 'Address deleted successfully'
        });
      }

      if (request === "edit") {
        const changes = req.body

        if (Object.keys(changes).length === 0) {
            return res.status(400).json({
              message: 'No changes provided for editing.'
            });
        }

        await Address.findOneAndUpdate({ id });
        return res.status(200).json({
          message: 'Address edited successfully'
        });
      }

      return res.status(200).json({
        message: 'Address updated successfully',
        updatedAddress: { ...findAddress._doc, ...changes }
      });
}


module.exports = {userAllAddress, createAddress, deleteOrEditAddress}


