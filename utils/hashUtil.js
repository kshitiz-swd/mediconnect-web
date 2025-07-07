const bcrypt = require('bcrypt')


const hashPassword = async(password, saltRounds)=>{
    const salt = await bcrypt.genSalt(saltRounds) 
    const hashPass = await bcrypt.hash(password, salt)

    return hashPass
} 

const comparePassword = async (inputPassword, hashPassword)=>{
    const comparePass = await bcrypt.compare(inputPassword, hashPassword)

    return comparePass
}

module.exports={hashPassword, comparePassword}