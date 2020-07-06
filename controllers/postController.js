const Post = require('../database/models/post')
const User = require('../database/models/user')

exports.create_post = async (req,res) =>{


    const {_id, user_name} = req.user
    const { files, fileValidationError } = req
    console.log(req.user)
    
    // if (!files || !files.length) {
    //     return res.status(400).send('Please upload some files');
    //   }
      if (fileValidationError) {
        return res.status(400).send(fileValidationError);
      }

const imagesdata = files.map(file =>  {return {'name':  file.originalname, 'path':  `/uploads/${file.filename}`}})

    const {post_description,post_title,lat,lng,city,place,view} = req.body
    let post = await new Post ({post_description,post_title,location:{coordinates:[lat, lng]},location:{city:city},location:{place:place},images:imagesdata,view:view,username:user_name});
    await post.save()
    const filter = {_id}
    const update = {$push: {posts:post._id}}
    await User.findOneAndUpdate(filter,update)
   res.send({
        post
    })

}

//Update post - POST

exports.edit_post = async (req, res) => {
console.log(req.body)
  const { id } = req.params;

  const { files, fileValidationError } = req;
  if (fileValidationError) {
    return res.status(400).send(fileValidationError);
  }

  const images = files.map((file) => {
    return { name: file.originalname, path: `/uploads/${file.filename}` };
  });

  const {
    post_description,
    // post_title,
    // city,
    // place,
    // view,
  } = req.body;

  const update = {
   "$set":{
    post_description,
    // post_title,
    // city,
    // place,
    // view,
    images,
   }
  };

  if (!images || !images.length) delete update.images

  await Post.findByIdAndUpdate(id, update);
  res.status(200).send('Yay')
};

   // get all posts
   exports.get_all_posts = async(req,res) =>{
       Post.find().sort({post_data: -1})  
       .then(data => res.json(data))
       .catch(err => console.error(err))
   }

   //get single post

   exports.get_one_post = async(req,res) =>{
    const {id} =req.params
    Post.findById(id)
    .then(data => res.json(data))
  .catch(err => console.error(err))
   }
