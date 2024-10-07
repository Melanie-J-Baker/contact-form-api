const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const sendMail = require("../mail");

// Index - return Message count
exports.index = asyncHandler(async (req, res, next) => {
  const messageCount = await Message.countDocuments({}).exec();
  res.json({ messageCount });
});

// Return list of all Messages
exports.message_list = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find({}).sort({ timestamp: 1 }).exec();
  if (allMessages === null) {
    const err = new Error("No messages found");
    err.status = 404;
    return next(err);
  }
  res.json({ allMessages });
});

// Return details for a specific Message
exports.message_detail = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id).exec();
  if (message === null) {
    const err = new Error("Message not found");
    err.status = 404;
    return next(err);
  }
  res.json({ message });
});

// Handle Message create on POST
exports.message_create_post = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Name must be at least 3 characters long."),
  body("email", "Email must be a valid email address").trim(),
  body("text", "Message must not be empty").trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const message = new Message({
      name: req.body.name,
      email: req.body.email,
      text: req.body.text,
    });
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    } else {
      sendMail(
        req.body.name,
        req.body.email,
        req.body.text,
        function (err, data) {
          if (err) {
            res.status(500).json({ message: "Internal Error" });
          } else {
            res.status({ message: "Email sent" });
          }
        }
      );
      await message.save();
      res.json({ status: "Message sent" });
    }
  }),
];

// Handle Message delete on DELETE
exports.message_delete = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id).exec();
  if (message === null) {
    const err = new Error("Message not found");
    err.status = 404;
    return next(err);
  } else {
    await message.deleteOne({ _id: req.params.id });
    res.json({ status: "Message deleted" });
  }
});
