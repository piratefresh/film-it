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
  Message.find({
    $or: [{ recipient: req.user.id }, { senderId: req.user.id }]
  })
    .sort({ date: -1 })
    .then(messages => res.json(messages))
    .catch(err =>
      res.status(404).json({ nomessagesfound: "Couldn't find any messages" })
    );
});

// @route   Get api/messages/:id
// @desc    Get User message by id
// @access  Private
router.get("/:id", isAuth, (req, res) => {
  Message.findById(req.params.id)
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
  Message.find({
    recipient: req.user.id,
    seen: false
  })
    .sort({ date: -1 })
    .then(messages => res.json(messages))
    .catch(err => {
      console.log(err);
      res.status(404).json({ nomessagesfound: "Couldn't find any messages" });
    });
});

// @route   Get api/messages/post/:handle/:subject
// @desc    Post Message to user by handle
// @access  Public
router.post("/post/:handle/:subject", isAuth, (req, res) => {
  Profile.findOne({ handle: req.params.handle }).then(profile => {
    const query = {
      subject: req.params.subject,
      $or: [{ recipient: req.user.id }, { senderId: req.user.id }]
    };
    Message.findOneAndUpdate(
      query,
      { $push: { messages: req.body.message } },
      { new: true },
      (error, doc) => {
        if (doc) {
          console.log("subject exist, appending message");
          res.json(doc);
        } else {
          console.log("new subject, making new message");
          const newMesg = new Message({
            subject: req.body.subject,
            senderId: req.user.id,
            messages: {
              replyName: req.body.senderHandle,
              text: req.body.message
            },
            sender: {
              avatar: req.body.avatar,
              name: req.body.name,
              handle: req.body.senderHandle
            },
            recipient: profile.user
          });
          newMesg.save().then(mesg => res.json(mesg));
        }
      }
    );
  });
});

router.post("/convo/:handle1/handle2", isAuth, (req, res) => {
  Conversation.findOneAndUpdate(
    {
      participants: { $all: [req.params.handle1, req.params.handle2] },
      subject: req.params.subject
    },
    { $push: { sender: req.body.sender, content: req.body.content } },
    (err, doc) => {
      if (doc) {
        console.log("message with users exist, appending message");
        res.json(doc);
      } else {
        console.log("Creating new Message");
        const newConvo = new Conversation({
          participants: [req.params.handle1, req.params.handle2],
          messages: {
            sender: req.body.handle,
            content: req.body.content
          }
        });
      }
    }
  );
});

module.exports = router;
