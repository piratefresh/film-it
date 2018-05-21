const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../../config/keys");
const multer = require("multer");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: keys.cloudinaryName,
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecret
});

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
// Check for either jwt or isauthenticated
const isAuth = require("../../middlewares/isAuth");
// Load profile model
const Profile = require("../../modules/Profile");
// Load user model
const User = require("../../modules/User");
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

// @route   GET api/profile/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get("/", isAuth, (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   Get api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json();
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   Get api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   Get api/profile/user:user_id
// @desc    Get profile by ID
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route   Post api/profile/
// @desc    Create or edit user profile
// @access  Private
router.post("/", isAuth, upload.single("avatar"), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  cloudinary.uploader.upload(req.file.path, result => {
    req.body.avatar = result.secure_url;
    console.log(result);
    // Get fields
    const profileFields = {};
    // Get user id, email name avatar
    profileFields.user = req.user.id;
    if (req.body.avatar) profileFields.avatar = req.body.avatar;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.state) profileFields.state = req.body.state;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.role) profileFields.role = req.body.role;
    if (req.body.reel) profileFields.reel = req.body.handle;
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social fields
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    // Finds one user by ID
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update Profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create profile
        // Check if handle exists (username)
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          //Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  });
});

// @route   POST api/profile/profilepic
// @desc    Add experince to profile
// @access  Private
router.post("/profilepic", isAuth, upload.single("image"), (req, res) => {
  cloudinary.uploader.upload(req.file.path, result => {
    req.body.image = result.secure_url;
    console.log(result);
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newImg = {
        image: req.body.image
      };

      // Add to experience array
      profile.gallery.unshift(newImg);
      // Save profile
      profile.save().then(profile => res.json(profile));
    });
  });
});

// @route   POST api/profile/experience
// @desc    Add experince to profile
// @access  Private
router.post("/experience", isAuth, (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to experience array
    profile.experience.unshift(newExp);
    // Save profile
    profile.save().then(profile => res.json(profile));
  });
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post("/education", isAuth, (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to experience array
    profile.education.unshift(newEdu);
    // Save profile
    profile.save().then(profile => res.json(profile));
  });
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience of profile
// @access  Private
router.delete("/experience/:exp_id", isAuth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
      // Splice out of array
      profile.experience.splice(removeIndex, 1);
      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education of profile
// @access  Private
router.delete("/education/:edu_id", isAuth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
      // Splice out of array
      profile.education.splice(removeIndex, 1);
      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete("/", isAuth, (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    );
  });
});

module.exports = router;
