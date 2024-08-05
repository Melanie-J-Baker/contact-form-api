const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true, maxLength: 10000 },
  timestamp: { type: Date, default: Date.now() },
});

// Virtual for changing timestamp to human-readable format
MessageSchema.virtual("timestamp_formatted").get(function () {
  // FORMAT DATE HERE!!!
});

module.exports = mongoose.model("Message", MessageSchema);
