import type { ChatInputCommandInteraction } from "discord.js";

export default async function (interaction: ChatInputCommandInteraction) {
  const threadId = interaction.options.getString("query", true);
  const channel = interaction.channel;
  if (!channel || !channel.isTextBased() || channel.isThread() || !("threads" in channel)) {
    await interaction.reply("This command can only be used in a text channel.");
    return;
  }

  const thread = await channel.threads.fetch(threadId).catch(() => null);
  if (!thread) {
    await interaction.reply("No thread found with that ID.");
    return;
  }

  const threadLink = `- https://discord.com/channels/${thread.guildId}/${thread.id}/${thread.id} \n`
  await interaction.reply(`${threadLink}`);
}