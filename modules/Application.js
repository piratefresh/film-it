const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const applicationSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "post"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  coverletter: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  jobType: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
});

module.exports = applicationSchema;
