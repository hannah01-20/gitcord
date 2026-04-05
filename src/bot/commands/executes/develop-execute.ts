import { type ChatInputCommandInteraction } from "discord.js";

export default async function developExecute(interaction: ChatInputCommandInteraction) {
  const channel = interaction.channel;
  if (!channel?.isThread()) {
    await interaction.reply(
      "This command can only be used within a thread.",
    );
    return;
  }
  const threadName = channel.name;
  if (!threadName.startsWith("review: ")) {
    await interaction.reply(
      "This command can only be used in threads that start with 'review: '.",
    );
    return;
  }
  channel.setName(threadName.replace("review: ", "develop: "));
  await interaction.reply("The issue has been marked for develop.");
}