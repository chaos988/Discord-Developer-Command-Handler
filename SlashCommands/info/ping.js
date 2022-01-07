const slashCommand = require("../../Structures/slashCommand");

module.exports = new slashCommand({
  name: "ping",
  description: "Ping a user",
  options: [
    {
      name: "target",
      description: "A user to ping",
      type: "USER",
      required: true,
    },
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const user = interaction.options.getUser("target") || interaction.user;
    interaction.followUp(`<@${user.id}>`);
  },
});
