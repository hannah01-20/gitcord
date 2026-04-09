import { type ChatInputCommandInteraction } from "discord.js";
import alwaysJoinThreads from "./always-join-threads.js";
import statusList from "./status-list.js";
export default async function(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "always-join-threads") {
    await alwaysJoinThreads(interaction);
    return;
  }

  if (subcommand === "status-list") {
    await statusList(interaction);
    return;
  }
  
}