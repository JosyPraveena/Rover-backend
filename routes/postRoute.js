var express = require('express');
var router = express.Router();
const authorizeUser = require('../middlewares/authorizeUser')
const imageUpload = require('../middlewares/imageUpload')
const postController = require('../controllers/postController')

// router.post('/',imageUpload.array('photos',5),postController.create_post)

//create post
router.post('/create',[authorizeUser,imageUpload.array('photos',5)],postController.create_post)

//list posts
router.get('/allposts',postController.get_all_posts)

//update post

router.put('/editpost/:id',[authorizeUser,imageUpload.array('photos',5)],postController.edit_post)

//get one post

router.get('/:id',postController.get_one_post)



module.exports = router;