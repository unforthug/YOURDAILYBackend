const PostSchema = require("../Models/PostSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../Models/UserSchema");

const CreatePost = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, post, imgUrl } = req.body;
    const newPost = await PostSchema.create({
      title,
      post,
      imgUrl,
      user_id: id,
    });
    res.status(200).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const SharePost = async (req, res) => {
  const {title,post} = req.body;

  let token ; 
  try{
      token = req.body.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded?.id).select("-password");
        req.user = user;
        
      }
      const {id} = req.user


  
    const sharedPost = await PostSchema.create({
      title : title,
      post : post,
      user_id: id,
    });
    res.status(200).json(sharedPost);
  } catch (error) {
    res.status(500).json({ message: error });
  }
    
  
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostSchema.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostSchema.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUserPosts = async (req, res) => {
  const { id } = req.user;
  try {
    const posts = await PostSchema.find({ user_id: id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  CreatePost,
  getPosts,
  getSinglePost,
  getUserPosts,
  SharePost,
};
