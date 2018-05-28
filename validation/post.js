const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  // Check if fields are empty
  data.title = !isEmpty(data.title) ? data.title : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";
  data.seeking = !isEmpty(data.seeking) ? data.seeking : "";
  //checking
  console.log(data.email);
  // Checks input
  if (Validator.isEmpty(data.title)) {
    errors.title = "Post title is required";
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = "The state in which project is in is required";
  }
  if (Validator.isEmpty(data.desc)) {
    errors.desc = "Project Description is required";
  }
  if (Validator.isEmpty(data.desc)) {
    errors.seeking =
      "Description of what you are seeking for this project is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
