import { 
  SlashCommandBuilder, 
  type ChatInputCommandInteraction, 
  type Command
} from "discord.js";

const command: Command = {
  data: new SlashCommandBuilder()
        .setName("gitcord")
        .setDescription("Gitcord is a Discord bot for managing threads in issues.")
        .addSubcommand(subcommand => 
          subcommand.setName("help")
                    .setDescription("Provides help information about Gitcord commands.")
        )
        .addSubcommand(subcommand =>
          subcommand.setName("add")
                    .setDescription("Add new issue and create a thread for it.")
                    .addStringOption(option =>
                      option.setName("issue-name")
                            .setDescription("The name of the issue to add.")
                            .setRequired(true)
                    )
                    .addUserOption(option =>
                      option.setName("assignee")
                            .setDescription("The user to assign the issue to.")
                    )
        ),
  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === "help") {
      await interaction.reply(
        "Here are the available Gitcord commands:"
        + "\n`/gitcord help` - Provides help information about Gitcord commands."
        + "\n`/gitcord add <issue-name>` - Add new issue and create a thread for it."
      );
      return;
    }
    if (subcommand === "add") {
      const issueName = interaction.options.getString("issue-name", true);
      const channel = interaction.channel;

      if (!channel || channel.isDMBased() || !("threads" in channel)) {
        await interaction.reply("This command can only be used in a guild channel that supports threads.");
        return;
      }

      const thread = await channel.threads.create({
        name: issueName,
        autoArchiveDuration: 60,
        reason: `Thread created for issue: ${issueName}`,
      });

      const assignee = interaction.options.getUser("assignee");
      if (assignee) {
        try {
          await thread.members.add(assignee.id);
          await thread.send(`Assignee: <@${assignee.id}>`);
        } catch {
          await thread.send(`Assignee: <@${assignee.id}> (could not be auto-added to the thread).`);
        }
      }

      await interaction.reply(`Issue "${issueName}" has been added and a thread has been created!`);
      return;
    }
  }
};

export default command;