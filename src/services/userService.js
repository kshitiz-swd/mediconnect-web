const User = require('../models/userModel')
const validator = require('validator')
const {hashPassword, comparePassword} = require('../../utils/hashUtil');
const generateToken = require('../../utils/tokenUtil')


const register = async ({ firstname, lastname, emailId, password, dob, mobile }) => {
  const existingUser = await User.findOne({ emailId });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const saltRounds = 10;
  const hashedPassword = await hashPassword(password, saltRounds)

  const user = new User({
    firstname,
    lastname,
    emailId,
    password: hashedPassword,
    mobile,
    dob,
    
  });

  return await user.save();
};

const login = async({emailId, password})=>{
    const user = await User.findOne({emailId})

    if(!user){
        throw new Error("User does not exists")
    }

    const validatePassword = await comparePassword(password, user.password)
    if(!validatePassword){
        throw new Error("Wrong password entered")
    }

    const token = generateToken({id: user._id, emailId:emailId})

    return({token, user})

}

const getUsers = async(req, res)=>{
    return await User.find({}, "-password -salt"); 

}

const getAUser = async(emailId)=>{
     
    if(!emailId){
        return res.status(400).send("Please enter emailId")
    }

    if(!validator.isEmail(emailId)){
        return res.status(400).send("Please enter valid emailId")
    }

    const user = await User.findOne({emailId:emailId})
    if(!user){
        return res.status(400).send("User does not exists")
    }

    return user
}


const updateUserProfile = async(req, res)=>{
    const loggedInUser = req.user

    if(!validateEditData(req)){
        return res.state(400).send("Invalid Edit Request")
    }

    Object.keys(req.body).forEach((key)=> (loggedInUser[key] = req.body[key]))

    await loggedInUser.save()

    res.json({message: `${loggedInUser.firstName}, your profile udpated successfully`, data: loggedInUser})
}


module.exports = {
    register, getAUser, updateUserProfile, getUsers, login
  };