import { type ChatInputCommandInteraction } from "discord.js";

export default async function helpExecute(interaction: ChatInputCommandInteraction) {
  await interaction.reply(
    "Here are the available Gitcord commands:" +
      "\n`/gitcord help` - Provides help information about Gitcord commands.\n" +
      "\n`/gitcord init` - Initialize Gitcord in the current channel.\n" +
      "\n`/gitcord config always-join-threads <action> <user>` - Manage users who always join threads.\n" +
      "\n`/gitcord config status-list <action> <status>` - Configure issue status options.\n" +
      "\n`/gitcord add <issue-name> <assignee>` - Add new issue and create a thread for it and assignee is optional.\n" +
      "\n`/gitcord issue set <status>` - Change the status of the issue.\n" +
      "\n`/gitcord issue rename <query>` - Rename an issue.\n" +
      "\n`/gitcord issue list <status>` - List issues. Status is optional.\n" +
      "\n`/gitcord issue search <name>` - Search for issues by name."
  );
}