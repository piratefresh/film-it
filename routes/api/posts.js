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
    Post.find(
      { $text: { $search: q.search } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  } else {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  }
});

// @route   Get api/posts/:id
// @desc    Get Post by user id
// @access  Public
router.get("/:id", (req, res) => {
  Post.find({ user: req.params.id })
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostfound: "Couldn't update that post" })
    );
});

// @route   Get api/posts/post/:id
// @desc    Get Post by post id
// @access  Public
router.get("/post/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostfound: "Couldn't update that post" })
    );
});

// @route   Update api/posts/:id/edit
// @desc    Update Post
// @access  Private
router.put(
  "/:id/edit",
  isAuth,
  upload.single("headerImage"),
  async (req, res) => {
    const { errors, isValid } = ValidatePostInput(req.body);
    // Check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    try {
      if (req.file) {
        // Deleting old avatar from cloudinary
        console.log("Deleting old post header");
        await cloudinary.v2.uploader.destroy(req.body.avatarImageId);
        // Uploading new avatar to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Get the new Result variables
        // The direct image url
        req.body.headerImage = result.secure_url;
        // Get the ID to later delete
        req.body.headerImageId = result.public_id;
      }
      updatePost = {
        user: req.user.id,
        handle: req.body.handle,
        name: req.body.name,
        avatar: req.body.avatar,
        title: req.body.title,
        desc: req.body.desc,
        seeking: {
          titles: req.body.roleTitles,
          desc: req.body.roleDesc
        },
        city: req.body.city,
        state: req.body.state,
        headerImage: req.body.headerImage,
        headerImageId: req.body.headerImageId,
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
    } catch (err) {
      console.log(err + "something wrong with update post");
    }
  }
);

// @route   POST api/posts
// @desc    Create Post
// @access  Private
router.post("/", isAuth, upload.single("headerImage"), async (req, res) => {
  // Deserialize the JSON
  const unpackTitles = JSON.parse(req.body.roleTitles);
  const unpackDesc = JSON.parse(req.body.roleDesc);

  const { errors, isValid } = ValidatePostInput(req.body);
  // Check validation
  if (!isValid) {
    // if any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  if (req.file) {
    // Uploading new avatar to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Get the new Result variables
    // The direct image url
    req.body.headerImage = result.secure_url;
    // Get the ID to later delete
    req.body.headerImageId = result.public_id;
  }
  //Creates new Post
  const newPost = new Post({
    user: req.user.id,
    name: req.body.name,
    handle: req.body.handle,
    avatar: req.body.avatar,
    title: req.body.title,
    desc: req.body.desc,
    seeking: {
      titles: unpackTitles,
      desc: unpackDesc
    },
    city: req.body.city,
    state: req.body.state,
    headerImage: req.body.headerImage,
    headerImageId: req.body.headerImageId,
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

// @route   DELETE api/posts/:id
// @desc    Delete Post
// @access  Private
router.delete("/:id", isAuth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findByIdAndRemove(req.params.id, async (err, post) => {
      try {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        //Delete
        console.log("deleted post image");
        console.log(post.headerImageId);
        await cloudinary.v2.uploader.destroy(post.headerImageId);
      } catch (err) {
        res.json({ error: "not success" });
      }
    });
  });
});

// @route   POST api/posts/apply/:id
// @desc    Like Post
// @access  Private
router.post("/:id/apply", isAuth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.applications.filter(
            apply => apply.user.toString() === req.user.id
          ).length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyapplied: "User already applied to this post" });
        }
        // Add user id to likes array
        post.applications.unshift({
          user: req.user.id,
          coverletter: req.body.coverletter,
          handle: req.body.handle,
          name: req.body.name,
          email: req.body.email,
          avatar: req.body.avatar
        });
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
