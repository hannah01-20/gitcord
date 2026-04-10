import { type ChatInputCommandInteraction } from "discord.js";
import all from "./all.js";

export default async function(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "all") {
    await all(interaction);
  }

  return;
}