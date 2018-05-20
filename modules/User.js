const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: String,
  email: String,
  local: {
    password: String,
    date: {
      type: Date,
      default: Date.now
    }
  },
  facebook: {
    id: String,
    token: String
  },
  google: {
    id: String,
    token: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
