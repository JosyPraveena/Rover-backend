const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema({
    post_title: {type: String, min: 2, max: 300},
    location:{ 
        city:{type:String},
        coordinates:{type: Array},
        place:{ type: String}
    },
    images:{ type: Array},
    display_one_image: {type: Array},
    post_description: {type: String},
    view:{type:Boolean},
    post_date : {type: Date,default: Date.now},
    username: {type: String}
 }, { collection: 'post' })

const Post = mongoose.model('Post', postSchema)

module.exports = Post