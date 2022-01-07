const discord = require("discord.js");
const Client = require("../index");

/**
 * @param {Client} client
 * @param {discord.Message} message
 * @param {Array<string>} args
 */
async function RunFunction(client, message, args) {}

class Command {
  /**
   * @typedef {{name: string, description: string, category: string, usage: string, aliases: string[], devOnly: boolean, premium: boolean, cooldown: number, userPermissions: import("discord.js").PermissionResolvable[], botPermissions: import("discord.js").PermissionResolvable[], run: RunFunction}} CommandOptions
   * @param {CommandOptions} options
   */
  constructor(options) {
    this.name = options.name;
    this.description = options.description;
    this.category = options.category;
    this.usage = options.usage;
    this.aliases = options.aliases;
    this.cooldown = options.cooldown;
    this.devOnly = options.devOnly;
    this.premium = options.premium;
    this.userPermissions = options.userPermissions;
    this.botPermissions = options.botPermissions;
    this.run = options.run;
  }
}

module.exports = Command;
