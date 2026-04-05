import { type ChatInputCommandInteraction } from "discord.js";

export default async function doneExecute(interaction: ChatInputCommandInteraction) {
  const channel = interaction.channel;
  if (!channel?.isThread()) {
    await interaction.reply(
      "This command can only be used within a thread.",
    );
    return;
  }
  const threadName = channel.name;
  if (!threadName.startsWith("develop: ")) {
    await interaction.reply(
      "This command can only be used in threads that start with 'develop: '.",
    );
    return;
  }
  channel.setName(threadName.replace("develop: ", "done: "));
  await interaction.reply("The issue has been marked for done.");
}