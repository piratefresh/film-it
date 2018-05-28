const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create our Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  avatar: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  image_id: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    trim: true
  },
  seeking: {
    type: String,
    trim: true,
    required: true
  },
  budget: {
    type: String
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
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
  ]
});

module.exports = Post = mongoose.model("post", PostSchema);
