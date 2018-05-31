const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  messages: [
    {
      replyName: {
        type: String
      },
      text: {
        type: String,
        required: true
      }
    }
  ],
  seen: {
    type: Boolean,
    default: false
  },
  senderId: {
    type: String,
    required: true
  },
  sender: {
    avatar: String,
    name: {
      type: String,
      required: true
    },
    handle: {
      type: String,
      required: true
    }
  },
  recipient: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model("messages", MessageSchema);
