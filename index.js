require('dotenv').config()
const Client = require("./Structures/Client");
const client = new Client();
require("dotenv").config()
module.exports = client;

client.start();
