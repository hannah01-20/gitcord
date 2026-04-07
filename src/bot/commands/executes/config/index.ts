import { type ChatInputCommandInteraction } from "discord.js";
import alwaysJoinThreads from "./always-join-threads.js";
export default async function(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "always-join-threads") {
    await alwaysJoinThreads(interaction);
    return;
  }
}