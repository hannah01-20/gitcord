import add from "./add.js";
import set from "./set.js";
import rename from "./rename.js";
import list from "./list.js";
import { type ChatInputCommandInteraction } from "discord.js";
import search from "./search.js";

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

  if (subcommand === "rename") {
    await rename(interaction);
    return;
  }

  if (subcommand === "list") {
    await list(interaction);
    return;
  }

  if (subcommand === "search") {
    await search(interaction);
    return;
  }

  console.error(`Unknown subcommand: ${subcommand}`);
}
