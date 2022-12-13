const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, addComment, getAllPosts } = require("../controllers/post");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost).delete(isAuthenticated, deletePost);

router.route("/post/:id").put(isAuthenticated, updateCaption)

router.route("/posts").get(isAuthenticated, getPostOfFollowing);

router.route("/allposts").get(isAuthenticated, getAllPosts);

router.route("/post/comment/:id").post(isAuthenticated, addComment);

module.exports = router; 