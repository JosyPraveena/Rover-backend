const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema({
    user_name: {type: String, min: 2, max: 100, required: true},
    email: {type: String, min: 2, max: 100, required: true, unique: true},
    password: {type: String, min: 2, max: 100, required: true},
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { collection: 'user' })

userSchema.methods.createToken = function () {
    //sending user information to client with jwt
    const payload = {_id : this._id, email: this.email, user_name: this.user_name}
    const seckretkey = process.env.JWT_SECRET
    const token = jwt.sign(payload,seckretkey)
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User