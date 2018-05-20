const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create our Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  genre: {
    type: [String],
    trim: true
  },
  pay: {
    type: String,
    required: true
  },
  photo: String,
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  number: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: "Point"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
