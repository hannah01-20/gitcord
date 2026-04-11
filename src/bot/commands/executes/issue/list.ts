import type { ChatInputCommandInteraction } from "discord.js";

export default async function(interaction: ChatInputCommandInteraction) {
  const status = interaction.options.getString("status");
  const channel = interaction.channel;
  if (!channel || !channel.isTextBased() || channel.isThread() || !("threads" in channel)) {
    await interaction.reply("This command can only be used in a guild text channel.");
    return;
  }

  const threads = await channel.threads.fetch();
  
  const filteredThreads = threads.threads.filter(thread => {
    if (!status && thread.name.includes(":")) return true;

    const threadPrefix = thread.name.split(":")[0]

    if (threadPrefix === status) return true;

    return false;
  })
  if (filteredThreads.size === 0) {
    await interaction.reply("No threads found");
    return;
  }

  const threadLinks = filteredThreads.map(thread =>
    `- https://discord.com/channels/${thread.guildId}/${thread.id}/${thread.id} \n`
  )
  const header = status ? `Threads with ${status} status:\n` : "All threads:\n";
  await interaction.reply(`${header}${threadLinks.join("")}`);
  return;
}