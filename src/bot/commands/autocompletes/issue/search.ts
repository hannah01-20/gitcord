import type { AutocompleteInteraction } from "discord.js";

export default async function searchAutoComplete(interaction: AutocompleteInteraction) {
  const channel = interaction.channel;
  if (!channel || !channel.isTextBased() || channel.isThread() || !("threads" in channel)) return;
  const name = interaction.options.getFocused(true).value.toLocaleLowerCase();

  const threads = await channel.threads.fetch();
  const filteredThreads = threads.threads.filter(thread => {
    const threadNameSplit = thread.name.split(":");
    const rawName = threadNameSplit[1]?.trim() || thread.name;
    return rawName.includes(name) && thread.name.includes(":")
  });

  await interaction.respond(
    filteredThreads.map(thread => {
      const threadNameSplit = thread.name.split(":");
      const rawName = threadNameSplit[1]?.trim() || thread.name;
      return { name: rawName, value: thread.id }
    }).slice(0, 25)
  );
}