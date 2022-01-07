const client = require("../index");
const Schema = require("../Database/cooldowns");
const prettyMs = require("pretty-ms");
const { MessageEmbed } = require("discord.js");
const premiumSystem = require("../Database/premiumSystem");
const blacklistSystem = require("../Database/blacklistSystem");

client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(client.config.prefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.get(client.aliases.get(cmd.toLowerCase()));

  if (!command) {
    return;
  } else {
    blacklistSystem.findOne(
      { userID: message.author.id },
      async (err, data) => {
        if (data) {
          const blacklistEmbed = new MessageEmbed()
            .setTitle("BLACKLISTED")
            .setDescription(
              `${message.author}, you are currently blacklisted from using my commands`
            )
            .setColor("RANDOM")
            .setTimestamp();
          message.channel.send({ embeds: [blacklistEmbed] });
        } else {
          if (
            command.premium &&
            !(await premiumSystem.findOne({ userID: message.author.id }))
          ) {
            const PremiumEmbed = new MessageEmbed()
              .setTitle("PREMIUM COMMAND")
              .setDescription(`This command is only for the premium members.`)
              .setColor(client.colors.indianred)
              .setTimestamp();
            message.reply({ embeds: [PremiumEmbed] });
          } else {
            if (command.cooldown) {
              let cooldown;
              try {
                cooldown = await Schema.findOne({
                  userID: message.author.id,
                  commandName: command.name,
                });
                if (!cooldown) {
                  cooldown = await Schema.create({
                    userID: message.author.id,
                    commandName: command.name,
                    cooldown: 0,
                  });
                  cooldown.save();
                }
              } catch (error) {
                console.log(error);
              }

              if (
                !cooldown ||
                command.cooldown * 1000 - (Date.now() - cooldown.cooldown) > 0
              ) {
                let CommandTime = prettyMs(command.cooldown * 1000, {
                  verbose: true,
                });
                const timeleft = prettyMs(
                  command.cooldown * 1000 - (Date.now() - cooldown.cooldown),
                  { verbose: true }
                );
                let cooldownMsg = new MessageEmbed()
                  .setTitle("COOLDOWN A BIT")
                  .setDescription(
                    `${message.author}, you can use **${command.name}** every **${CommandTime}** try again in **${timeleft}**`
                  )
                  .setColor("RANDOM")
                  .setFooter({
                    text: `${client.user.tag}`,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                  });
                return message.reply({ embeds: [cooldownMsg] });
              } else {
                await command.run(client, message, args);
                await Schema.findOneAndUpdate(
                  {
                    userID: message.author.id,
                    commandName: command.name,
                  },
                  {
                    cooldown: Date.now(),
                  }
                );
              }
            } else {
              if (!message.member.permissions.has(command.userPermissions)) {
                const userPermission = new MessageEmbed()
                  .setTitle("MISSING PERMISSIONS")
                  .setDescription(
                    `You are missing \`${command.userPermissions
                      .join(", ")
                      .replace(/\_/g, " ")}\``
                  )
                  .setColor(client.colors.silver)
                  .setTimestamp();
                message.channel.send({ embeds: [userPermission] });
              }

              if (!message.guild.me.permissions.has(command.botPermissions)) {
                const userPermission = new MessageEmbed()
                  .setTitle("MISSING PERMISSIONS")
                  .setDescription(
                    `I am missing \`${command.botPermissions
                      .join(", ")
                      .replace(/\_/g, " ")}\``
                  )
                  .setColor(client.colors.silver)
                  .setTimestamp();
                message.channel.send({ embeds: [userPermission] });
              }

              if (
                command.devOnly == true &&
                message.author.id !== "725217637923029033"
              ) {
                const DevOnly = new MessageEmbed()
                  .setTitle("<:off1:926841605397299230> An Error Occured")
                  .setDescription("*Waaa~~* You are not my developer")
                  .setColor("RED")
                  .setTimestamp();
                message.reply({ embeds: [DevOnly] });
              }

              await command.run(client, message, args);
            }
          }
        }
      }
    );
  }
});
