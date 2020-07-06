var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController')

router.get('/:place',searchController.search_post)

module.exports = router