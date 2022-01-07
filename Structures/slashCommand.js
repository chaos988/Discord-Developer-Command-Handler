const discord = require("discord.js");
const client = require("./Client");

/**
 *
 * @param {client} client
 * @param {discord.CommandInteraction | discord.ContextMenuInteraction} interaction
 * @param {String[]} args
 */
async function runFunction(client, interaction, args) {}

class slashCommand {
  /**
   * @typedef {{name: string, description: string, type: import("discord.js").ApplicationCommandType, options: import("discord.js").ApplicationCommandOptionData[], defaultPermission: boolean, run: runFunction }} Run
   * @param {Run} option
   */
  constructor(option) {
    this.name = option.name;
    this.description = option.description;
    this.defaultPermission = option.defaultPermission;
    this.options = option.options;
    this.type = option.type;
    this.run = option.run;
  }
}

module.exports = slashCommand;