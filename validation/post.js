const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  // Check if fields are empty
  data.email = !isEmpty(data.email) ? data.email : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.budget = !isEmpty(data.budget) ? data.budget : "";
  data.text = !isEmpty(data.text) ? data.text : "";
  //checking
  console.log(data.email);
  // Checks input
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }
  if (Validator.isEmpty(data.pay)) {
    errors.pay = "Payment is required";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
