const express = require('express')
const router = express.Router()

const blogController = require('../controllers/blogController')



router.get('/',blogController.blogList);
router.post('/',blogController.blogPost);
router.get('/:id',blogController.blogGetById);
router.delete('/:id',blogController.blogDelete)

module.exports = router
