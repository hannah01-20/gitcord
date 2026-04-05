import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
  type Command,
} from "discord.js";
import help from "../executes/help.js";
import init from "../executes/init.js";
import issue from "../executes/issue/index.js";
import config from "../executes/config/index.js";
import search from "../executes/search/index.js";

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
        .setName("init")
        .setDescription("Initialize Gitcord configuration in the current channel and will create a pin message configuration."),
    )
    // The "config" subcommand group contains all commands related to configuring Gitcord settings for a channel.
    .addSubcommandGroup(group => 
      group
        .setName("config")
        .setDescription("Commands for configuring Gitcord settings.")
        .addSubcommand(subcommand =>
          subcommand
            .setName("addAlwaysJoinThreads")
            .addMentionableOption(option => 
              option
                .setName("user")
                .setDescription("The user to always join threads for.")
            )
        )
    )
    // The "issue" subcommand group contains all commands related to managing issues.
    .addSubcommandGroup(group => 
      group
        .setName("issue")
        .setDescription("Commands for managing issues.")
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
        )
        .addSubcommand((subcommand) =>
          subcommand.setName("done").setDescription("Mark an issue for done."),
        )
    )
    // The "search" subcommand group contains all commands related to searching for issues.
    .addSubcommandGroup(group =>
      group
        .setName("search")
        .setDescription("Commands for searching for issues.")
        .addSubcommand(subcommand =>
          subcommand
            .setName("issue-name")
            .setDescription("Search for issues by name.")
            .addStringOption(option =>
              option
                .setName("query")
                .setDescription("The name of the issue to search for.")
                .setRequired(true),
            )
        )
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand();
    const subcommandGroup = interaction.options.getSubcommandGroup();

    if (subcommandGroup === "issue") {
      await issue(interaction);
      return;
    }

    if (subcommandGroup === "search") {
      await search(interaction);
      return;
    }

    if (subcommandGroup === "config") {
    await config(interaction);
    return;
    }

    if (subcommand === "help") {
      await help(interaction);
      return;
    }
    if (subcommand === "init") {
      await init(interaction);
      return;
    }
  },
};

export default command;
