import type { AutocompleteInteraction } from "discord.js";
import issueNameAutoComplete from "./issue-name.js";
export default async function (interaction: AutocompleteInteraction) {
  const subcommand = interaction.options.getSubcommand();
  
  if (subcommand === "issue-name") {
    await issueNameAutoComplete(interaction);
    return;
  }
}