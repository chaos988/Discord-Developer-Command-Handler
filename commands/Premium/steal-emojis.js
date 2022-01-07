const Command = require("../../Structures/Command");
const { Util, MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: "steal-emoji",
  description: "Steal emojis from other servers",
  category: "Premium",
  cooldown: 10,
  usage: "<EMOJI>",
  premium: true,
  run: async (client, message, args) => {
    if (!args.length) return message.reply("What emojis are you gonna steal to add to this server?")
    for (const rawEmoji of args) {
      const parsedEmoji = Util.parseEmoji(rawEmoji)

      if (parsedEmoji.id && !parsedEmoji.animated) {
        const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id}.png`
        message.guild.emojis.create(url, parsedEmoji.name).then((emoji) => {
          const AddedEmojiEmbed = new MessageEmbed()
            .setTitle("EMOJI ADDED")
            .setDescription(`<:${emoji.name}:${emoji.id}> **${emoji.name}** has been added to the server.`)
            .setFooter({ text: `Added By: ${message.author.id}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor("GREEN")
          message.channel.send({ embeds: [AddedEmojiEmbed] })
        })
      } else if (parsedEmoji.id && parsedEmoji.animated) {
        const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id}.gif`
        message.guild.emojis.create(url, parsedEmoji.name).then((emoji) => {
          const AddedEmojiEmbed = new MessageEmbed()
            .setTitle("EMOJI ADDED")
            .setDescription(`<a:${emoji.name}:${emoji.id}> **${emoji.name}** has been added to the server.`)
            .setFooter({ text: `Added By: ${message.author.id}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor("GREEN")
          message.channel.send({ embeds: [AddedEmojiEmbed] })
        })
      }
    }
  },
});