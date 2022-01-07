const { default: chalk } = require("chalk");
const { table } = require("table");
const client = require("../index");
const mongoose = require("mongoose");
require("dotenv").config()

client.on("ready", () => {
  const {
    mongooseConnectionString
  } = require("../Structures/Data/config.json");

  const config = {
    border: {
      topBody: `═`,
      topJoin: `╦`,
      topLeft: `╔`,
      topRight: `╗`,

      bottomBody: `═`,
      bottomJoin: `╩`,
      bottomLeft: `╚`,
      bottomRight: `╝`,

      bodyLeft: `║`,
      bodyRight: `║`,
      bodyJoin: `║`,

      joinBody: `═`,
      joinLeft: `╠`,
      joinRight: `╣`,
      joinJoin: `╬`,
    },
    header: {
      alignment: "center",
      content: "CLIENT DATA",
    },
  };

  try {
    if (!mongooseConnectionString) {
      const data = [
        [`${chalk.red.bold("LOGGED IN AS")}`, `${chalk.red.bold(client.user.tag)}`, `${chalk.red.bold("The bot that I am logged in as.")}`],
        [`${chalk.yellow.bold("DATABASE")}`, `${chalk.yellow.bold("No Database Connection")}`, `${chalk.yellow.bold("Mongoose Database")}`],
        [`${chalk.green.bold("SERVERS")}`, `${chalk.green.bold(client.guilds.cache.size.toLocaleString())}`, `${chalk.green.bold("The amount of servers that I am in.")}`],
        [`${chalk.cyan.bold("USERS")}`, `${chalk.cyan.bold(client.users.cache.size.toLocaleString())}`, `${chalk.cyan.bold("The amount of users using my commands.")}`],
        [`${chalk.blue.bold("PREFIX")}`, `${chalk.blue.bold(client.config.prefix)}`, `${chalk.blue.bold("The prefix to use to run my commands")}`],
        [`${chalk.red.bold("COMMANDS")}`, `${chalk.red.bold(client.commands.size.toLocaleString())}`, `${chalk.red.bold("Commands Loaded")}`],
        [`${chalk.yellow.bold("PING")}`, `${chalk.yellow.bold(`${client.ws.ping}ms`)}`, `${chalk.yellow.bold("Websocket Ping")}`]
      ]
      console.log(table(data, config))
    } else {
      mongoose
      .connect(process.env.mongoURI || mongooseConnectionString)
      .then(() => {
        const data2 = [
          [`${chalk.red.bold("LOGGED IN AS")}`, `${chalk.red.bold(client.user.tag)}`, `${chalk.red.bold("The bot that I am logged in as.")}`],
          [`${chalk.yellow.bold("DATABASE")}`, `${chalk.yellow.bold("Connected To Database")}`, `${chalk.yellow.bold("Mongoose Database")}`],
          [`${chalk.green.bold("SERVERS")}`, `${chalk.green.bold(client.guilds.cache.size.toLocaleString())}`, `${chalk.green.bold("The amount of servers that I am in.")}`],
          [`${chalk.cyan.bold("USERS")}`, `${chalk.cyan.bold(client.users.cache.size.toLocaleString())}`, `${chalk.cyan.bold("The amount of users using my commands.")}`],
          [`${chalk.blue.bold("PREFIX")}`, `${chalk.blue.bold(client.config.prefix)}`, `${chalk.blue.bold("The prefix to use to run my commands")}`],
          [`${chalk.red.bold("COMMANDS")}`, `${chalk.red.bold(client.commands.size.toLocaleString())}`, `${chalk.red.bold("Commands Loaded")}`],
          [`${chalk.yellow.bold("PING")}`, `${chalk.yellow.bold(`${client.ws.ping}ms`)}`, `${chalk.yellow.bold("Websocket Ping")}`]
        ]
        console.log(table(data2, config))
      })
    }
  } catch (error) {
    const ErrorConfig = {
      border: {
        topBody: `═`,
        topJoin: `╦`,
        topLeft: `╔`,
        topRight: `╗`,
  
        bottomBody: `═`,
        bottomJoin: `╩`,
        bottomLeft: `╚`,
        bottomRight: `╝`,
  
        bodyLeft: `║`,
        bodyRight: `║`,
        bodyJoin: `║`,
  
        joinBody: `═`,
        joinLeft: `╠`,
        joinRight: `╣`,
        joinJoin: `╬`,
      },
      header: {
        alignment: "center",
        content: "ERROR",
      },
    };
    const Error = [
      ["An Error Occured", `${error}`]
    ]
    console.log(table(Error, ErrorConfig))
  }
  client.user.setActivity({ name: `${client.config.prefix}`, type: "PLAYING" });
});
