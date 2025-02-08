import postModel from "../models/postModel.js";
import fs from "fs";
//const Post = require("../models/Post");

//creating a new post
const createPost = async (req, res) => {
  try {
    const { title, text, city, activityType } = req.body;
    const image = req.file.path; // Assuming multer for file uploads
    //let image_filename = `$(req.file.filename}`;
    /*
        const post = new postModel({
            title: req.body.title,
            text:req.body.text,
            city:req.body.city,
            activityType:req.body.activityType
            image:image_filename
        })
        */
    const newPost = new Post({
      title,
      text,
      city,
      activityType,
      image,
      author: req.user.userId,
    });
    await newPost.save();
    res.json({ success: true, massage: "Product Item Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, massage: "ERROR" });
  }
};

//At home page, after clicking the "show all" button
const getAllPosts = async (req, res) => {
  try {
    const { city, activity } = req.query;
    let query = {};
    if (city) query.city = city;
    if (activity) query.activityType = activity;

    const posts = await Post.find(query).populate("author", "username");
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.json({ success: false, massage: "ERROR" });
  }
};

//At the home page, the list of suggested posts
const getSuggestedPosts = async (req, res) => {
  try {
    const posts = await Post.find().limit(4);
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.json({ success: false, massage: "ERROR" });
  }
};

//updating a post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.userId)
      return res.status(403).json({ message: "Not authorized" });

    await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Post updated successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, massage: "ERROR" });
  }
};

//deleting a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json({ message: "Post not found" });

    if (post.author.toString() !== req.user.userId)
      return res.json({ message: "Not authorized" });

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, massage: "ERROR" });
  }
};

export { createPost, getAllPosts, getSuggestedPosts, updatePost, deletePost };
