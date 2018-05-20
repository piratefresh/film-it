const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed" }, false);
    }
  }
};

// load post model
const Post = require("../../modules/Post");
// Load Profile Model
const Profile = require("../../modules/Profile");
// Validate Post
const ValidatePostInput = require("../../validation/post");
// Validate Comment
const ValidateCommentInput = require("../../validation/comment");
// Middlewares
const isLoggedIn = require("../../middlewares/isLoggedIn");
const upload = multer(multerOptions).single("photo");
const resize = async (req, res, next) => {
  // Check if there is no new file to resize
  if (!req.file) {
    next(); // Skip to the next middleware
    return;
  }
  console.log(req.file);
};

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   Get api/posts
// @desc    Get Posts
// @access  Public
router.get("/", (req, res) => {
  Post.find(req.query)
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
router.put(
  "/:id/edit",
  upload,
  resize,
  passport.authenticate(["jwt", "google"]),
  (req, res) => {
    const { errors, isValid } = ValidatePostInput(req.body);
    // Check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    console.log(req.body);
    updatePost = {
      title: req.body.title,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      contact: req.body.contact,
      email: req.body.email,
      number: req.body.number,
      pay: req.body.pay,
      script: req.body.script,
      photo: req.body.photo,
      genre: req.body.genre,
      address: req.body.address
    };
    Post.findByIdAndUpdate(req.params.id, updatePost, { new: true })
      .then(posts => res.json(posts))
      .catch(err =>
        res.status(404).json({ nopostfound: "Couldn't update that post" })
      );
  }
);

// @route   POST api/posts
// @desc    Create Post
// @access  Private
router.post(
  "/",
  upload,
  resize,
  /* passport.authenticate("jwt", { session: false }) */
  passport.authenticate(["jwt", "google"]),
  (req, res) => {
    const { errors, isValid } = ValidatePostInput(req.body);
    // Check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      title: req.body.title,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      contact: req.body.contact,
      email: req.body.email,
      number: req.body.number,
      pay: req.body.pay,
      script: req.body.script,
      photo: req.body.photo,
      genre: req.body.genre
    });
    // Save post
    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete Post
// @access  Private
router.delete("/:id", passport.authenticate(["jwt", "google"]), (req, res) => {
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
router.post(
  "/like/:id",
  passport.authenticate(["jwt", "google"]),
  (req, res) => {
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
  }
);

// @route   POST api/posts/unlike/:id
// @desc    UnLike Post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate(["jwt", "google"]),
  (req, res) => {
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
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate(["jwt", "google"]),
  (req, res) => {
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
  }
);

// @route   Delete api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate(["jwt", "google"]),
  (req, res) => {
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
  }
);

module.exports = router;
