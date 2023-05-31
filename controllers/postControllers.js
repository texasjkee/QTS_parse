const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
  try{
    const [posts, _] = await Post.findAll();
    
    res.status(200).json({count: posts.length, posts});
  } catch (error) {
    console.log(error);
    next(error);
  };
};

exports.createNewPost = async (req, res, next) => {
  try {
    const {name, desc} = req.body;

    let post = new Post(name, desc);
    post = await post.save();
    
    console.log(post);

    res.status(201).json({message: 'Post created'});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const [post, _] = await Post.findById(postId);
    
    res.status(200).json({post: post[0]});
  } catch (error) {
    console.log(error);
    next(error);
  };
};