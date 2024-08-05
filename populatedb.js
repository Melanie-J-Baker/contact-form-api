#! /usr/bin/env node

console.log(
  'This script populates some test messages to database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.cojoign.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Message = require("./models/message");

const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createMessages();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function messageCreate(index, name, email, text, timestamp) {
  const messagedetail = { name, email, text, timestamp };

  const message = new Message(messagedetail);

  await message.save();
  messages[index] = message;
  console.log(`Added message: ${name} ${email}`);
}

async function createMessages() {
  console.log("Adding messages");
  await Promise.all([
    messageCreate(
      0,
      "Helen Bauer",
      "hbauer@trustyhogs.com",
      "Have you seen Catherine Bohart?",
      Date.now()
    ),
    messageCreate(
      1,
      "Stephen Merchant",
      "smerchant@theoutlaws.co.uk",
      "Laser eye surgery",
      Date.now()
    ),
    messageCreate(
      2,
      "Catherine Bohart",
      "cbohart@trustyhogs.com",
      "Hello! Have you seen Helen Bauer?",
      Date.now()
    ),
  ]);
}
