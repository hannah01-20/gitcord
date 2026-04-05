import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
  type Command,
} from "discord.js";
import helpExecute from "../executes/help-execute.js";
import addExecute from "../executes/add-execute.js";
import reviewExecute from "../executes/review-execute.js";
import reworkExecute from "../executes/rework-execute.js";
import developExecute from "../executes/develop-execute.js";
import doneExecute from "../executes/done-execute.js";

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
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("done").setDescription("Mark an issue for done."),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("search")
        .setDescription("Search for issues.")
        .addUserOption((option) =>
          option
            .setName("assignee")
            .setDescription("Filter by assigned user.")
            .setRequired(false),
        )
        .addStringOption((option) =>
          option
            .setName("issue-name")
            .setDescription("Filter by a specific keyword in the issue name.")
            .setRequired(false),
        ),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === "help") {
      await helpExecute(interaction);
      return;
    }
    if (subcommand === "add") {
      await addExecute(interaction);
      return;
    }
    if (subcommand === "review") {
      await reviewExecute(interaction);
      return;
    }
    if (subcommand === "rework") {
      await reworkExecute(interaction);
      return;
    }

    if (subcommand === "develop") {
      await developExecute(interaction);
      return;
    }

    if (subcommand === "done") {
      await doneExecute(interaction);
      return;
    }

    
  },
};

export default command;
