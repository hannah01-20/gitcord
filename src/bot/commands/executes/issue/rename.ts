import { type ChatInputCommandInteraction } from "discord.js";

export default async function renameExecute(
  interaction: ChatInputCommandInteraction
) {
  const channel = interaction.channel;

  if (!channel?.isThread()) {
    await interaction.reply(
      "This command can only be used in a thread channel."
    );
    return;
  }

  const newIssueName = interaction.options.getString("new-issue-name", true);
  const previousName = channel.name;
  const status = previousName.split(": ")[0];
  const newThreadName = `${status}: ${newIssueName}`;

  await interaction.deferReply();
  try {
    await channel.setName(newThreadName);
    await interaction.editReply(
      `The issue has been renamed from "${previousName}" to "${newThreadName}".`
    );
  } catch {
    await interaction.editReply(
      "Could not rename the thread (e.g. rate limit or permissions). Try again in a moment."
    );
  }
}
