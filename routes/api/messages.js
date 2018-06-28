const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Mongodb Models
// load Message model
const Message = require("../../modules/Message");
// Load Conversation Model
const Conversation = require("../../modules/Conversation");
// Load Profile Model
const Profile = require("../../modules/Profile");
// Check for either jwt or isauthenticated
const isAuth = require("../../middlewares/isAuth");

// @route   Get api/messages/
// @desc    Get User messages
// @access  Private
router.get("/", isAuth, (req, res) => {
  Profile.findOne({ user: { _id: req.user.id } }).then(profile => {
    Conversation.find({
      participants: profile.handle
    })
      .sort({ date: -1 })
      .then(messages => res.json(messages))
      .catch(err =>
        res.status(404).json({ nomessagesfound: "Couldn't find any messages" })
      );
  });
});

// @route   Get api/messages/:id
// @desc    Get User message by id
// @access  Private
router.get("/:id", isAuth, (req, res) => {
  console.log(req.params);
  Conversation.findById(req.params.id)
    .sort({ date: -1 })
    .then(messages => res.json(messages))
    .catch(err =>
      res.status(404).json({ nomessagesfound: "Couldn't find any messages" })
    );
});

// @route   Get api/messages/unread
// @desc    Get unread messages
// @access  Private
router.get("/unread", isAuth, (req, res) => {
  Profile.findOne(req.user.id).then(profile => {
    Conversation.find({
      participants: profile.handle,
      messages: {
        read: false
      }
    })
      .sort({ date: -1 })
      .then(messages => res.json(messages))
      .catch(err => {
        console.log(err);
        res.status(404).json({ nomessagesfound: "Couldn't find any messages" });
      });
  });
});

// @route   Get api/messages/inbox/profile/handle
// @desc    Get messages by id
// @access  Private
router.get("/inbox/profile/:handle", isAuth, (req, res) => {
  Profile.findOne({ handle: req.params.handle }).then(profile => {
    Profile.findOne({ user: { _id: req.user.id } }).then(userProfile => {
      Conversation.find({
        participants: {
          $all: [profile.handle, userProfile.handle]
        }
      })
        .sort({ date: -1 })
        .then(messages => res.json(messages))
        .catch(err =>
          res
            .status(404)
            .json({ nomessagesfound: "Couldn't find any messages" })
        );
    });
  });
});

// @route   Get api/messages/post/:handle/:subject
// @desc    Post Message to user by handle
// @access  Public
router.post("/convo", isAuth, (req, res) => {
  Profile.findOne({ handle: req.body.recieverHandle }).then(profile => {
    Conversation.findOneAndUpdate(
      {
        participants: {
          $in: [req.body.senderHandle, req.body.recieverHandle]
        },
        subject: req.body.subject
      },
      {
        $push: {
          messages: {
            sender: req.body.senderHandle,
            message: req.body.message
          }
        }
      },
      { new: true },
      (err, doc) => {
        if (doc) {
          console.log("message with users exist, appending message");
          res.json(doc);
        } else {
          console.log("Creating new Message");
          const newConvo = new Conversation({
            subject: req.body.subject,
            participants: [req.body.senderHandle, req.body.recieverHandle],
            avatars: [req.body.senderAvatar, profile.avatar],
            messages: {
              sender: req.body.senderHandle,
              message: req.body.message
            }
          });
          newConvo.save().then(convo => {
            res.json(convo);
          });
        }
      }
    );
  });
});

module.exports = router;
