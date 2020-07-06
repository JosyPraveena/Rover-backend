var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const authenticationController = require('../controllers/authenticationController')
const authorizeUser = require('../middlewares/authorizeUser')

//my profile

router.get('/me', authorizeUser,userController.getme)

//get user

router.get('/:id',userController.getOneUser)

//Create user - POST

router.post('/signup',userController.create_user)

//user login - post

router.post('/login',authenticationController.login)

//list user - GET

router.get('/allusers',userController.getUsers)




// router.get('/',() =>console.log('fbdsjhgfhd'))
module.exports = router;
