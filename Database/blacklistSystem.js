const { Schema, model } = require("mongoose");

module.exports = model(
  "Blacklist",
  new Schema({
    userID: { type: String, required: true },
    reason: { type: String, required: true },
    Date: { type: String, required: true }
  })
);
