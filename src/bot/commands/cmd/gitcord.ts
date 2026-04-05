import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
  type Command,
} from "discord.js";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("gitcord")
    .setDescription("Gitcord is a Discord bot for managing threads in issues.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("help")
        .setDescription("Provides help information about Gitcord commands."),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add new issue and create a thread for it.")
        .addStringOption((option) =>
          option
            .setName("issue-name")
            .setDescription("The name of the issue to add.")
            .setRequired(true),
        )
        .addUserOption((option) =>
          option
            .setName("assignee")
            .setDescription("The user to assign the issue to."),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("review")
        .setDescription("Issue has PR and for review.")
        .addUserOption((option) =>
          option
            .setName("reviewer_1")
            .setDescription("Request a review from a user."),
        )
        .addUserOption((option) =>
          option
            .setName("reviewer_2")
            .setDescription("Request a review from a user."),
        )
        .addUserOption((option) =>
          option
            .setName("reviewer_3")
            .setDescription("Request a review from a user."),
        )
        .addUserOption((option) =>
          option
            .setName("reviewer_4")
            .setDescription("Request a review from a user."),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("rework").setDescription("Mark an issue for rework."),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("develop")
        .setDescription("Mark an issue for develop."),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === "help") {
      await interaction.reply(
        "Here are the available Gitcord commands:" +
          "\n`/gitcord help` - Provides help information about Gitcord commands." +
          "\n`/gitcord add <issue-name>` - Add new issue and create a thread for it.",
      );
      return;
    }
    if (subcommand === "add") {
      const issueName = interaction.options.getString("issue-name", true);
      const channel = interaction.channel;

      if (!channel || channel.isDMBased() || !("threads" in channel)) {
        await interaction.reply(
          "This command can only be used in a guild channel that supports threads.",
        );
        return;
      }

      const thread = await channel.threads.create({
        name: `open: ${issueName}`,
        autoArchiveDuration: 60,
        reason: `Thread created for issue: ${issueName}`,
      });

      const assignee = interaction.options.getUser("assignee");
      if (assignee) {
        try {
          await thread.members.add(assignee.id);
          await thread.send(`Assignee: <@${assignee.id}>`);
        } catch {
          await thread.send(
            `Assignee: <@${assignee.id}> (could not be auto-added to the thread).`,
          );
        }
      }

      await interaction.reply(
        `Issue "${issueName}" has been added and a thread has been created!`,
      );
      return;
    }
    if (subcommand === "review") {
      const channel = interaction.channel;
      if (!channel?.isThread()) {
        await interaction.reply(
          "This command can only be used within a thread.",
        );
        return;
      }
      const reviewers = [
        interaction.options.getUser("reviewer_1"),
        interaction.options.getUser("reviewer_2"),
        interaction.options.getUser("reviewer_3"),
        interaction.options.getUser("reviewer_4"),
      ].filter(Boolean) as ReturnType<typeof interaction.options.getUser>[];
      const threadName = channel.name;
      if (!threadName.startsWith("open: ")) {
        await interaction.reply(
          "This command can only be used in threads that start with 'open: '.",
        );
        return;
      }

      channel.setName(threadName.replace("open: ", "review: "));

      if (reviewers.length > 0) {
        const reviewerMentions = reviewers
          .map((reviewer) => `<@${reviewer?.id}>`)
          .join(", ");
        await interaction.reply(`Review requested from: ${reviewerMentions}`);
      }
      return;
    }
    if (subcommand === "rework") {
      const channel = interaction.channel;
      if (!channel?.isThread()) {
        await interaction.reply(
          "This command can only be used within a thread.",
        );
        return;
      }
      const threadName = channel.name;
      if (!threadName.startsWith("review: ")) {
        await interaction.reply(
          "This command can only be used in threads that start with 'review: '.",
        );
        return;
      }
      channel.setName(threadName.replace("review: ", "rework: "));
      await interaction.reply("The issue has been marked for rework.");
      return;
    }

    if (subcommand === "develop") {
      const channel = interaction.channel;
      if (!channel?.isThread()) {
        await interaction.reply(
          "This command can only be used within a thread.",
        );
        return;
      }
      const threadName = channel.name;
      if (!threadName.startsWith("review: ")) {
        await interaction.reply(
          "This command can only be used in threads that start with 'review: '.",
        );
        return;
      }
      channel.setName(threadName.replace("review: ", "develop: "));
      await interaction.reply("The issue has been marked for develop.");
      return;
    }
  },
};

export default command;
