const jwt = require('jsonwebtoken')

const authorizeStudent = (req,res,next) =>{

    console.log("@9999999" + req.headers['authorization'])
    const authHeader = req.headers['authorization']
    //spliting bearer from req header
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.send(401).send('Unauthorized')
    //verifying 
    jwt.verify(token,process.env.JWT_SECRET,(err,payload) =>{
        if(err) return res.send(403).send('Token is invalid')
        //attaching the payload to the request
        req.user = payload
        
        next()
    })
}

module.exports = authorizeStudent