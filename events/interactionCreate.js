const { MessageEmbed } = require("discord.js");
const blacklistSystem = require("../Database/blacklistSystem");
const client = require("../index");

client.on("interactionCreate", async (interaction) => {
  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "An error has occured " });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    blacklistSystem.findOne(
      { userID: interaction.user.id },
      async (err, data) => {
        if (data) {
          const blacklisted = new MessageEmbed()
            .setTitle("BLACKLISTED")
            .setDescription(
              `${interaction.user} you are currently blacklisted from using my commands`
            )
            .setColor("RANDOM")
            .setTimestamp();
          interaction.followUp({ embeds: [blacklisted] });
        } else {
          cmd.run(client, interaction, args);
        }
      }
    );
  }

  // Context Menu Handling
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    blacklistSystem.findOne(
      { userID: interaction.user.id },
      async (err, data) => {
        if (data) {
          const blacklisted = new MessageEmbed()
            .setTitle("BLACKLISTED")
            .setDescription(
              `${interaction.user} you are currently blacklisted from using my commands`
            )
            .setColor("RANDOM")
            .setTimestamp();
          interaction.followUp({ embeds: [blacklisted] });
        } else {
          if (command) command.run(client, interaction);
        }
      }
    );
  }
});
