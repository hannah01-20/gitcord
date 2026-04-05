import { type ChatInputCommandInteraction } from "discord.js";
import addAlwaysJoinThreads from "./add-always-join-threads.js";
export default async function(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "addAlwaysJoinThreads") {
    await addAlwaysJoinThreads(interaction);
    return;
  }
}