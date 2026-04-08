import add from "./add.js";
import set from "./set.js";
import { type ChatInputCommandInteraction } from "discord.js";

export default async function (interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "add") {
    await add(interaction);
    return;
  }

  if (subcommand === "set") {
    console.log("Executing issue set command");
    await set(interaction);
    return;
  }

  console.error(`Unknown subcommand: ${subcommand}`);
}