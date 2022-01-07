const { MessageEmbed } = require("discord.js");
const blacklistSystem = require("../../Database/blacklistSystem");
const Command = require("../../Structures/Command");

module.exports = new Command({
  name: "blacklist-add",
  description: "Blacklists a user from using my commands",
  aliases: ["add-blacklist"],
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
    const reason = args.slice(1).join(" ")
    if (!reason) return message.reply("What is the reason for the blacklist?")
    blacklistSystem.findOne({ userID: user.id }, async(err, data) => {
      if (data) return message.reply("This user is already blacklisted")
      await new blacklistSystem({
        userID: user.id,
        reason: reason,
        Date: new Date().toLocaleDateString()
      }).save()
      message.reply({ embeds: [
        new MessageEmbed()
          .setTitle("BLACKLISTED")
          .addField("User", `${user.tag}`, true)
          .addField("Reason", `${reason}`, true)
          .setColor("GREEN")
          .setTimestamp()
      ] })
    })
  },
});
