const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  // Check if fields are empty
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  // Checks input
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile Handle is required";
  }
  if (Validator.isEmpty(data.role)) {
    errors.role = "Role field is required";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }
  // Check if social/website fields has url link
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  if (!isEmpty(data.linkdin)) {
    if (!Validator.isURL(data.linkdin)) {
      errors.linkdin = "Not a valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
  if (!isEmpty(data.reel)) {
    if (!Validator.isURL(data.reel)) {
      errors.reel = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
