const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");

module.exports = new Command({
  name: "ping",
  description: "Bot ping",
  category: "info",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  cooldown: 10,
  premium: false,
  run: async (client, message, args) => {
    const Pinging = new MessageEmbed()
      .setTitle("PINGING...")
      .addField("Websocket Ping", "> Pinging. . .", true)
      .addField("API Ping", "> Pinging. . .", true)
      .addField("Message Edit Ping", "> Pinging. . .", true)
      .setColor(client.colors.invis);
    const embed = await message.channel.send({ embeds: [Pinging] });

    const websocket = message.createdTimestamp - Date.now();
    const api = client.ws.ping.toLocaleString();
    const msgedit = Math.floor(
      embed.createdAt - message.createdAt
    ).toLocaleString();

    let circles = {
      green: "<:theconnectionisexcellent:926841606282309664>",
      yellow: "<:theconnectionisgood:926841605078532096>",
      red: "<:theconnectionisbad:926841606831759391>",
    };

    const websocketPing =
      websocket <= 200
        ? circles.green
        : websocket <= 400
        ? circles.yellow
        : circles.red;
    const apiPing =
      api <= 200
        ? circles.green
        : api <= 400
        ? circles.yellow
        : circles.red;
    const edit =
      msgedit <= 200
        ? circles.green
        : msgedit <= 400
        ? circles.yellow
        : circles.red;

    const Pong = new MessageEmbed()
      .setTitle("Pong 🏓")
      .addField("Websocket Ping", `> ${websocketPing}${websocket.toLocaleString()}`, true)
      .addField("API Ping", `> ${apiPing}${api}`, true)
      .addField("Message Edit Ping", `> ${edit}${msgedit}`, true)
      .setColor(client.colors.invis);
    embed.edit({ embeds: [Pong] });
    message.delete();
  },
});
