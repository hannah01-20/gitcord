import {
  AutocompleteInteraction,
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
  type Command,
} from "discord.js";
import help from "../executes/help.js";
import init from "../executes/init.js";
import issue from "../executes/issue/index.js";
import config from "../executes/config/index.js";
import issueAutoComplete from "../autocompletes/issue/index.js";
import { getChannelConfig } from "../helpers/channel-config.js";

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
        .setDescription(
          "Initialize Gitcord configuration in the current channel and will create a pin message configuration.",
        ),
    )
    // The "config" subcommand group contains all commands related to configuring Gitcord settings for a channel.
    .addSubcommandGroup((group) =>
      group
        .setName("config")
        .setDescription("Commands for configuring Gitcord settings.")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("always-join-threads")
            .setDescription(
              "Configure users who should always be added to issue threads.",
            )
            .addStringOption((option) =>
              option
                .setName("action")
                .setDescription(
                  "Whether to add or remove a user from always joining threads.",
                )
                .addChoices(
                  { name: "add", value: "add" },
                  { name: "remove", value: "remove" },
                )
                .setRequired(true),
            )
            .addMentionableOption((option) =>
              option
                .setName("user")
                .setDescription("The user to always join threads for.")
                .setRequired(true),
            ),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("status-list")
            .setDescription("Configure issue status options.")
            .addStringOption((option) =>
              option
                .setName("action")
                .setDescription("The action to perform on the issue status.")
                .setRequired(true)
                .addChoices(
                  { name: "add", value: "add" },
                  { name: "remove", value: "remove" },
                ),
            )
            .addStringOption((option) =>
              option
                .setName("status")
                .setDescription("The name of the issue status.")
                .setRequired(true),
            )
            .addBooleanOption((option) =>
              option
                .setName("is-default")
                .setDescription(
                  "Whether this status should be the default status for new issues.",
                )
                .setRequired(false),
            ),
        ),
    )
    // The "issue" subcommand group contains all commands related to managing issues.
    .addSubcommandGroup((group) =>
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
            .setName("set")
            .setDescription("Set the status of an issue.")
            .addStringOption((option) =>
              option
                .setName("status")
                .setDescription("The status to set for the issue.")
                .setAutocomplete(true)
                .setRequired(true),
            ),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("rename")
            .setDescription("Rename an issue.")
            .addStringOption((option) =>
              option
                .setName("new-issue-name")
                .setDescription("The name of the issue to search for.")
                .setAutocomplete(true)
                .setRequired(true),
            ),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("list")
            .setDescription("List of all issues.")
            .addStringOption((option) =>
              option
                .setName("status")
                .setDescription("Filter issues by status.")
                .setRequired(false)
                .setAutocomplete(true),
            ),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("search")
            .setDescription("Search for issues by name.")
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription("The name of the issue to search for.")
                .setRequired(true)
                .setAutocomplete(true),
            ),
        ),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand();
    const subcommandGroup = interaction.options.getSubcommandGroup();
    const channel = interaction.channel;
    if (!channel) {
      await interaction.reply("This command can only be used in a channel.");
      return;
    }
    const channelConfig = await getChannelConfig(channel);

    if (subcommand === "help" && !subcommandGroup) {
      await help(interaction);
      return;
    }
    if (subcommand === "init" && !subcommandGroup) {
      await init(interaction);
      return;
    }

    if (!channelConfig) {
      await interaction.reply(
        "Gitcord is not configured for this channel. Please run /gitcord init to set up Gitcord for this channel.",
      );
      return;
    }

    if (subcommandGroup === "issue") {
      await issue(interaction);
      return;
    }

    if (subcommandGroup === "config") {
      await config(interaction);
      return;
    }
  },

  async autoComplete(interaction: AutocompleteInteraction) {
    const subcommandGroup = interaction.options.getSubcommandGroup();

    if (subcommandGroup === "issue") {
      await issueAutoComplete(interaction);
      return;
    }
  },
};

export default command;
