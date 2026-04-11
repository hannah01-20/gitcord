import { type ChatInputCommandInteraction } from "discord.js";
import issueName from "./issue-name.js";

export default async function(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();
  
  if (subcommand === "issue-name") {
    await issueName(interaction);
    return;
  }
}