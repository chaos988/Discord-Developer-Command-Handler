const { MessageEmbed } = require("discord.js");
const blacklistSystem = require("../../Database/blacklistSystem");
const Command = require("../../Structures/Command");

module.exports = new Command({
  name: "blacklist-remove",
  description: "Remove a blacklisted user.",
  aliases: ["remove-blacklist"],
  category: "DEVELOPER",
  cooldown: 10,
  devOnly: true,
  run: async (client, message, args) => {
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache
        .filter((m) => m.user.id === args[0])
        .get(args[0]) ||
      message.guild.members.cache
        .filter((m) => m.user.username === args[0])
        .get(args[0]) ||
      message.guild.members.cache
        .filter((m) => m.user.tag === args[0])
        .get(args[0]);

    blacklistSystem.findOne({ userID: user.id }, async (err, data) => {
      if (!data) return message.reply("This user is not blacklisted");
      await data.delete();
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("BLACKLISTED")
            .setDescription(`User ${user.tag} has been removed from the blacklist`)
            .setColor("GREEN")
            .setTimestamp(),
        ],
      });
    });
  },
});
