import { AutocompleteInteraction } from "discord.js";
import { statusAutoComplete } from "./status.js";
import searchAutoComplete from "./search.js";

export default async function (interaction: AutocompleteInteraction) {
  const command = interaction.options.getSubcommand();

  if (command === "set" || command === "list") {
    await statusAutoComplete(interaction);
    return;
  }

  if (command === "search") {
    await searchAutoComplete(interaction);
    return;
  } 
}