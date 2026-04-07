import { type ChatInputCommandInteraction } from "discord.js";
import { getChannelConfig } from "../helpers/channel-config.js";

export default async function initExecute(interaction: ChatInputCommandInteraction) {
  if (!interaction.channel || interaction.channel.isDMBased()) {
    await interaction.reply(
      "This command can only be used in a guild channel.",
    );
    return;
  }

  const existingConfig = await getChannelConfig(interaction.channel);
  if (existingConfig) {
    await interaction.reply(
      "Gitcord has already been initialized in this channel.",
    );
    return;
  }

  const configFormat = {
    "alwaysJoinThreads": [],
  };

  (await interaction.channel.send({
    content: "**GITCORD CONFIGURATION**\n" + "```json\n" + JSON.stringify(configFormat, null, 2) + "\n```",
  })).pin()
}