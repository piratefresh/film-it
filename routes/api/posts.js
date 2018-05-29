const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../../config/keys");
const multer = require("multer");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: keys.cloudinaryName,
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecret
});

// load post model
const Post = require("../../modules/Post");
// Load Profile Model
const Profile = require("../../modules/Profile");
// Validate Post
const ValidatePostInput = require("../../validation/post");
// Validate Comment
const ValidateCommentInput = require("../../validation/comment");
// Check for either jwt or isauthenticated
const isAuth = require("../../middlewares/isAuth");
// Multer config
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
// Multer init
const upload = multer({ storage: storage, fileFilter: imageFilter });

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   Get api/posts
// @desc    Get Posts
// @access  Public
router.get("/", (req, res) => {
  let q = {};
  if (req.query.search) {
    q.search = req.query.search;
    Post.find({ $text: { $search: q.search } })
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  }
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   Get api/posts/:id
// @desc    Get Post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route   Update api/posts/:id/edit
// @desc    Update Post
// @access  Private
router.put("/:id/edit", isAuth, (req, res) => {
  const { errors, isValid } = ValidatePostInput(req.body);
  // Check validation
  if (!isValid) {
    // if any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  console.log(req.body);
  updatePost = {
    user: req.user.id,
    name: req.body.name,
    avatar: req.body.avatar,
    title: req.body.title,
    desc: req.body.desc,
    seeking: {
      role: req.body.seekingRole,
      desc: req.body.seekingDesc
    },
    city: req.body.city,
    state: req.body.state,
    start: req.body.start,
    end: req.body.end,
    jobType: req.body.jobType,
    tags: req.body.tags.split(","),
    budget: req.body.budget,
    company: req.body.company
  };
  Post.findByIdAndUpdate(req.params.id, updatePost, { new: true })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostfound: "Couldn't update that post" })
    );
});

// @route   POST api/posts
// @desc    Create Post
// @access  Private
router.post("/", isAuth, upload.single("image"), (req, res) => {
  const { errors, isValid } = ValidatePostInput(req.body);
  // Check validation
  if (!isValid) {
    // if any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  cloudinary.uploader.upload(req.file.path, result => {
    req.body.image = result.secure_url;
    req.body.image_id = result.public_id;
    const newPost = new Post({
      user: req.user.id,
      name: req.body.name,
      image: req.body.image,
      image_id: req.body.image_id,
      avatar: req.body.avatar,
      title: req.body.title,
      desc: req.body.desc,
      seeking: {
        role: req.body.seekingRole,
        desc: req.body.seekingDesc
      },
      city: req.body.city,
      state: req.body.state,
      start: req.body.start,
      end: req.body.end,
      jobType: req.body.jobType,
      tags: req.body.tags.split(","),
      budget: req.body.budget,
      company: req.body.company
    });
    // Save post
    newPost.save().then(post => res.json(post));
  });
});

// @route   DELETE api/posts/:id
// @desc    Delete Post
// @access  Private
router.delete("/:id", isAuth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Check for post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        //Delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  });
});

// @route   POST api/posts/like/:id
// @desc    Like Post
// @access  Private
router.post("/like/:id", isAuth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }
        // Add user id to likes array
        post.likes.unshift({ user: req.user.id });
        //save to db
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  });
});

// @route   POST api/posts/unlike/:id
// @desc    UnLike Post
// @access  Private
router.post("/unlike/:id", isAuth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "You have not yet liked this post" });
        }
        // Get remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        // Splice out of array
        post.likes.splice(removeIndex, 1);
        // Save to db
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  });
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post("/comment/:id", isAuth, (req, res) => {
  const { errors, isValid } = ValidateCommentInput(req.body);
  // Check validation
  if (!isValid) {
    // if any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };
      // Add to comments array
      post.comments.unshift(newComment);
      // Save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found" }));
});

// @route   Delete api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete("/comment/:id/:comment_id", isAuth, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexist: "Comment does not exist" });
      }
      // Get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);
      // Splice comment out of array
      post.comments.splice(removeIndex, 1);
      // Save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found" }));
});

module.exports = router;
