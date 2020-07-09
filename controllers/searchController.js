const Post = require('../database/models/post')

exports.search_post = async(req,res) =>{
    const {place} = req.params
    console.log(place)
    await Post.find({"location.place":  { $regex: new RegExp("^" + place.toLowerCase(), "i") }})
    // if(!searchResults) return res.status(400).send('No search results')
    .then(data => res.json(data))
  .catch(err => console.error(err))
}

