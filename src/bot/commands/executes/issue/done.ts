import { type ChatInputCommandInteraction } from "discord.js";

export default async function doneExecute(
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
  if (!threadName.startsWith("develop: ")) {
    return await interaction.reply({
      content:
        "This command can only be used in threads that start with 'develop: '.",
      ephemeral: true,
    });
  }

  await interaction.deferReply();

  try {
    const newThreadName = threadName.replace("develop: ", "done: ");

    const renamePromise = channel.setName(newThreadName);
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("RATE_LIMIT")), 2500),
    );

    await Promise.race([renamePromise, timeout]);
    await interaction.editReply("The issue has been marked for done.");
  } catch (error) {
    await interaction.editReply(
      'We reached the Discord "Rate Limit". Please wait 10 minutes before trying to rename this thread again!',
    );
  }
}
