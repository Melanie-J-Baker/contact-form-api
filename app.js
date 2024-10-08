const createError = require("http-errors");
const compression = require("compression");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");

// get config vars
dotenv.config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");

const app = express();

app.set("trust proxy", 3);

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  // Set up rate limiter: max 20 reqs/min
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
app.use(limiter); // Apply rate limiter to all reqs

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(compression());
app.use(bodyParser.json());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const corsOptions = {
  origin: "https://melanie-j-baker.github.io",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
// enable CORS pre-flight
app.options("*", cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
