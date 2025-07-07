const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY 


const createToken = (payload)=>{
    const token  = jwt.sign(payload, secret_key, {expiresIn:"1h"} )
    return token
}

module.exports = createToken