const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessagesSchema = require("./Message");

// Create Schema
const ConversationSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  participants: [
    {
      type: [String],
      required: true
    }
  ],
  avatars: [
    {
      type: [String],
      required: true
    }
  ],
  messages: [MessagesSchema],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Conversation = mongoose.model(
  "conversation",
  ConversationSchema
);
