const validateSignUpData = (req)=>{
    const requiredFields = ['firstname', 'lastname', 'emailId', 'mobile', 'password']

    const canSignUp = Object.keys(req.body).every((key)=> requiredFields.includes(key))

    return canSignUp
}


const validateEditeData = (req)=>{
    const allowedEditFields = ["firstname", 'lastname', 'mobile', 'dob']

    const isEditAllowed = Object.keys(req.body).every((field)=> allowedEditFields.includes(field))

    return isEditAllowed
}

module.exports = {validateEditeData, validateSignUpData}