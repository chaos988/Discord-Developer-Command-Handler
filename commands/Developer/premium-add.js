const { MessageEmbed } = require("discord.js");
const premiumSystem = require("../../Database/premiumSystem");
const Command = require("../../Structures/Command");

module.exports = new Command({
  name: "add-premium",
  description: "Add a member to the premium system.",
  devOnly: true,
  category: "DEVELOPER",
  cooldown: 10,
  run: async (client, message, args) => {
    const member =
      message.mentions.users.first() ||
      message.guild.members.cache
        .filter((m) => m.user.username === args[0])
        .get(args[0]) ||
      message.guild.members.cache
        .filter((m) => m.user.tag === args[0])
        .get(args[0]) ||
      message.guild.members.cache
        .filter((m) => m.user.id === args[0])
        .get(args[0]);

    if (!member)
      return message.reply("Who are you gonna add to the premium system?");

    premiumSystem.findOne({ userID: member.id }, async (err, data) => {
      if (data) return message.reply(`${member} is already a premium user.`);
      new premiumSystem({ userID: member.id }).save();
      return message.channel.send({ embeds: [
        new MessageEmbed()
          .setTitle("ADDED")
          .setDescription(`${member} has been added to the premium system.`)
          .setColor(client.colors.seagreen)
          .setTimestamp()
      ] })
    });
  },
});
