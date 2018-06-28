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
    handle: {
      type: String,
      required: true,
      max: 40
    },
    name: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
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
    seeking: {
      desc: {
        type: [String],
        trim: true
      },
      titles: {
        type: [String],
        required: true
      }
    },
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
    headerImage: {
      type: String
    },
    headerImageId: {
      type: String
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
