const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessagesSchema = require("./Message");

// Create Schema
const ConversationSchema = new Schema({
  roomId: {
    type: String
  },
  participants: [
    {
      type: [String],
      required: true
    }
  ],
  avatars: [
    {
      type: [String]
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
