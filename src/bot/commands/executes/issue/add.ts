import { type ChatInputCommandInteraction } from "discord.js";
import { getChannelConfig } from "../../helpers/get-channel-config.js";

export default async function addExecute(interaction: ChatInputCommandInteraction) {
  const issueName = interaction.options.getString("issue-name", true);
  const channel = interaction.channel;

  if (!channel || channel.isDMBased() || !("threads" in channel)) {
    await interaction.reply(
      "This command can only be used in a guild channel that supports threads.",
    );
    return;
  }
  const existingConfig = await getChannelConfig(channel);
  if (!existingConfig) {
    await interaction.reply(
      "Gitcord has not been initialized in this channel. Please run `/gitcord init` first.",
    );
    return;
  }

  const thread = await channel.threads.create({
    name: `open: ${issueName}`,
    autoArchiveDuration: 60,
    reason: `Thread created for issue: ${issueName}`,
  });

  const assignee = interaction.options.getUser("assignee");
  if (assignee) {
    try {
      await thread.members.add(assignee.id);
      await thread.send(`Assignee: <@${assignee.id}>`);
    } catch {
      await thread.send(
        `Assignee: <@${assignee.id}> (could not be auto-added to the thread).`,
      );
    }
  }

  await interaction.reply(
    `Issue "${issueName}" has been added and a thread has been created!`,
  );
}