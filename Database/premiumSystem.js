const { Schema, model } = require("mongoose");

module.exports = model("Premium", new Schema({
  userID: { type: String, required: true }
}))