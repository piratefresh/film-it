const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ApplicationSchema = require("./Application");

// Create our Schema
const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    avatar: {
      type: String,
      required: true,
      index: false
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
      type: String,
      index: false
    },
    image_id: {
      type: String,
      index: false
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
      required: true,
      index: true
    },
    city: {
      type: String,
      required: true,
      index: true
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
    applications: [ApplicationSchema],
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
  },
  { autoIndex: false }
);

PostSchema.index({
  state: "text",
  city: "text",
  tags: "text",
  title: "text",
  desc: "text"
});

module.exports = Post = mongoose.model("post", PostSchema);
