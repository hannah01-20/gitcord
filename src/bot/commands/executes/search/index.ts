import { type ChatInputCommandInteraction } from "discord.js";

export default async function(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();
  console.log("Received search command with subcommand:", subcommand);
}