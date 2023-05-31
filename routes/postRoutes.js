const { Router } = require('express');
const postControllers = require('../controllers/postControllers');
const router = Router();

router.route('/')
  .get(postControllers.getAllPosts)
  .post(postControllers.createNewPost);

router.route('/:id').get(postControllers.getPostById);

module.exports = router;
