import { AutocompleteInteraction } from "discord.js";
import { statusAutoComplete } from "./status.js";

export default async function (interaction: AutocompleteInteraction) {
  const command = interaction.options.getSubcommand();

  if (command === "set" || command === "all") {
    await statusAutoComplete(interaction);
    return;
  }
}