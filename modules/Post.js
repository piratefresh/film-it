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
  company: {
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
  tags: [
    {
      type: String,
      trim: true
    }
  ],
  seeking: [
    {
      desc: {
        type: String,
        trim: true
      },
      role: {
        type: String,
        required: true,
        trim: true
      }
    }
  ],
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
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date
  },
  jobType: {
    type: String
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

PostSchema.index({ "$**": "text" });

module.exports = Post = mongoose.model("post", PostSchema);
