const { Client, Collection } = require("discord.js");
const Command = require("./Command");
const slashCommand = require("./slashCommand");
const Utils = require("./Utils");

class client extends Client {
  constructor() {
    super({
      intents: 32767,
      partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
    });

    /**
     * @type {Collection<string, Command>}
     */
    this.commands = new Collection();
    /**
     * @type {Collection<string, Command>}
     */
    this.aliases = new Collection();
    /**
     * @type {Collection<string, slashCommand>}
     */
    this.slashCommands = new Collection();
    this.config = require("./Data/config.json");
    this.colors = require("./Data/colors.json");
    this.utils = new Utils(this);
  }
  start() {
    this.utils.startClient();
  }
}

module.exports = client;
