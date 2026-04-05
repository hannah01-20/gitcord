import { type ChatInputCommandInteraction } from "discord.js";

export default async function developExecute(interaction: ChatInputCommandInteraction) {
  const channel = interaction.channel;
  if (!channel?.isThread()) {
    await interaction.reply({
      content: "This command can only be used within a thread.",
      ephemeral: true,
    });
    return;
  }
  const threadName = channel.name;
  if (!threadName.startsWith("review: ")) {
    await interaction.reply({
      content: "This command can only be used in threads that start with 'review: '.",
      ephemeral: true,
    });
    return;
  }
  await interaction.deferReply();
  try{
    channel.setName(threadName.replace("review: ", "develop: "));
     interaction.editReply("The issue has been marked for develop.");
  } catch (error) {
    await interaction.editReply(
      'We reached the Discord "Rate Limit". Please wait 10 minutes before trying again!',
    );
  }
}