import add from "./add.js";
import review from "./review.js";
import rework from "./rework.js";
import develop from "./develop.js";
import done from "./done.js";
import { type ChatInputCommandInteraction } from "discord.js";

export default async function (interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === "add") {
    await add(interaction);
    return;
  }
  if (subcommand === "review") {
    await review(interaction);
    return;
  }
  if (subcommand === "rework") {
    await rework(interaction);
    return;
  }

  if (subcommand === "develop") {
    await develop(interaction);
    return;
  }

  if (subcommand === "done") {
    await done(interaction);
    return;
  }
}