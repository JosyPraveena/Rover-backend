const User =  require('../database/models/user')
const bcrypt = require('bcrypt')


exports.login = async (req,res) =>{
    const {email,password} = req.body
    console.log(email,password)
    //check if user exist
    let user = await User.findOne({email})
        //error if user not registered
    if(!user) return res.status(400).send('Invalid request')
    //comparing plain text password and bcrypted pwd in DB --returns boolean
    const match = await bcrypt.compare(password,user.password)
    if(!match) return res.status(400).send("Invalid credentials")
    const token = user.createToken()
    res.set('Access-Control-Expose-Headers', 'x-authorization-token')
    res.set('x-authorization-token',token).send("Login success")
}