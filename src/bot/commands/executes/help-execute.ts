import { type ChatInputCommandInteraction } from "discord.js";

export default async function helpExecute(interaction: ChatInputCommandInteraction) {
  await interaction.reply(
    "Here are the available Gitcord commands:" +
      "\n`/gitcord help` - Provides help information about Gitcord commands." +
      "\n`/gitcord add <issue-name>` - Add new issue and create a thread for it." +
      "\n`/gitcord review <reviewer_1> <reviewer_2> <reviewer_3> <reviewer_4>` - Issue has PR and for review." +
      "\n`/gitcord rework` - Mark an issue for rework." +
      "\n`/gitcord develop` - Mark an issue for develop." +
      "\n`/gitcord done` - Mark an issue for done.",
  );
}