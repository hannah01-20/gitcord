import { type ChatInputCommandInteraction } from "discord.js";

export default async function reviewExecute(
  interaction: ChatInputCommandInteraction,
) {
  const channel = interaction.channel;

  if (!channel?.isThread()) {
    return await interaction.reply({
      content: "This command can only be used within a thread.",
      ephemeral: true,
    });
  }

  const threadName = channel.name;
  const isRework = threadName.startsWith("rework: ");
  const isOpen = threadName.startsWith("open: ");

  if (!isRework && !isOpen) {
    return await interaction.reply({
      content:
        "This command can only be used in threads that start with 'open: ' or 'rework: '.",
      ephemeral: true,
    });
  }

  await interaction.deferReply();

  try {
    const currentPrefix = isRework ? "rework: " : "open: ";
    const newThreadName = threadName.replace(currentPrefix, "review: ");

    const renamePromise = channel.setName(newThreadName);
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("RATE_LIMIT")), 2500),
    );

    await Promise.race([renamePromise, timeout]);

    const reviewers = [
      interaction.options.getUser("reviewer_1"),
      interaction.options.getUser("reviewer_2"),
      interaction.options.getUser("reviewer_3"),
      interaction.options.getUser("reviewer_4"),
    ].filter((u): u is NonNullable<typeof u> => u !== null);

    const reviewMessage =
      reviewers.length > 0
        ? `Review requested from: ${reviewers.map((r) => `<@${r.id}>`).join(", ")}`
        : "The issue has been marked for review.";

    await interaction.editReply(reviewMessage);
  } catch (error) {
    await interaction.editReply(
      'We reached the Discord "Rate Limit". Please wait 10 minutes before trying again!',
    );
  }
}
