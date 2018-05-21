const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validationRegisterInput = require("../../validation/register");
const validationLoginInput = require("../../validation/login");
// Middleware
const isLoggedIn = require("../../middlewares/isLoggedIn");

// Load user model
const User = require("../../modules/User");

// @route   GET api/users/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

/* // @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
); */

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get("/current", (req, res) => {
  res.json(req.user);
});

module.exports = router;
