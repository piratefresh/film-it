const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load input validation
const validationRegisterInput = require("../validation/register");
const validationLoginInput = require("../validation/login");
const isLoggedIn = require("../middlewares/isLoggedIn");

module.exports = router => {
  // @route   POST api/users/register
  // @desc    Register user
  // @access  Public
  router.post("/auth/local/register", (req, res) => {
    const { errors, isValid } = validationRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          local: {
            password: req.body.password
          }
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.local.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.local.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  // @route   GET api/users/login
  // @desc    Login User / Returning JWT Token
  // @access  Public
  router.post("/auth/local/login", (req, res) => {
    const { errors, isValid } = validationLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.local.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name, email: user.email }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  });

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // the callback after google has authenticated the user
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/"
    }),
    (req, res) => {
      console.log(req.user);
      // User Matched
      const payload = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      }; // Create JWT Payload

      // Sign Token
      let token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });

      token = "Bearer " + token;
      console.log(token);
      res.cookie("jwtToken", token);
      res.redirect("/dashboard");
    }
  );

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  /*   router.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"]
    })
  );

  // handle the callback after facebook has authenticated the user
  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  ); */

  // route for logging out
  router.get("/auth/logout", (req, res) => {
    req.logout();
    req.googlesession = null;
    res.redirect("/");
  });

  router.get("/profile", (req, res, next) => {
    //We'll just send back the user details and the token
    res.json({
      message: "You made it to the secure route",
      user: req.user,
      token: req.query.secret_token
    });
  });
};

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}
