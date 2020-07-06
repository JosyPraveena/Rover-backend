var express = require('express');
var router = express.Router();
const authenticationController = require('../controllers/authenticationController')

router.post('/login',authenticationController.login)
module.exports = router;