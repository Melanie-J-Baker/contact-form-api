const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MessageSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true, maxLength: 10000 },
  timestamp: { type: Date, default: Date.now() },
});

// Virtual for changing timestamp to human-readable format
MessageSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Message", MessageSchema);
