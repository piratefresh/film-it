const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: String,
  message: String,
  read: {
    type: Boolean,
    default: false
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "conversation"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = messageSchema;
