import { type ChatInputCommandInteraction } from "discord.js";

export default async function addAlwaysJoinThreads(interaction: ChatInputCommandInteraction) {
  const user = interaction.options.getUser("user");
  console.log("Adding user to always join threads:", user);
}