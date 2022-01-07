const mongoose = require("mongoose");

module.exports = mongoose.model("cooldowns", new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  commandName: {
    type: String,
    required: true
  },
  cooldown: {
    type: String,
    default: 0
  }
}));
