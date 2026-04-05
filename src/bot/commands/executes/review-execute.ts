import { type ChatInputCommandInteraction } from "discord.js";

export default async function reviewExecute(interaction: ChatInputCommandInteraction) {
  const channel = interaction.channel;
  if (!channel?.isThread()) {
    await interaction.reply(
      "This command can only be used within a thread.",
    );
    return;
  }
  const reviewers = [
    interaction.options.getUser("reviewer_1"),
    interaction.options.getUser("reviewer_2"),
    interaction.options.getUser("reviewer_3"),
    interaction.options.getUser("reviewer_4"),
  ].filter(Boolean) as ReturnType<typeof interaction.options.getUser>[];
  const threadName = channel.name;
  if (!threadName.startsWith("rework: ")) {
    await interaction.reply(
      "This command can only be used in threads that start with 'open: ' or 'rework: '.",
    );
    return;
  }

  let threadPrefix = threadName.startsWith("open: ") ? "open: " : "rework: ";
  const newThreadName = threadName.replace(threadPrefix, "review: ");

  await channel.setName(newThreadName);

  const reviewMessage = reviewers.length > 0
    ? `Review requested from: ${reviewers.map((reviewer) => `<@${reviewer?.id}>`).join(", ")}`
    : "The issue has been marked for review.";

  await interaction.reply(reviewMessage);
}