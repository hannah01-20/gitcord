import { type ChatInputCommandInteraction, type AutocompleteInteraction } from "discord.js";
import { getChannelConfig, type T_ChannelConfigMessage } from "../../helpers/channel-config.js";

export default async function setExecute(interaction: ChatInputCommandInteraction) {
  const channel = interaction.channel;

  if (!(channel?.isThread())){
    await interaction.reply("This command can only be used in a thread channel.");
    return;
  }

  const channelConfig = await getChannelConfig(channel);
  if (!channelConfig) {
    await interaction.reply("Gitcord has not been initialized in this channel. Please run `/gitcord init` first.");
    return;
  }

  const status = interaction.options.getString("status");
  if (!channelConfig.config.issueStatus.includes(status!)) {
    await interaction.reply("Invalid status. Please choose a valid status from the autocomplete options.");
    return;
  }

  const threadName = channel.name;
  let newThreadName: string;
  const statusPrefix = `${status}: `;
  if (threadName.includes(": ")) {
    newThreadName = threadName.replace(/^[^:]+: /, statusPrefix);
  } else {
    newThreadName = statusPrefix + threadName;
  }
  await interaction.deferReply();
  try {
    const renamePromise = channel.setName(newThreadName);

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("RATE_LIMIT")), 2500),
    );
    await Promise.race([renamePromise, timeout]);
  
    await interaction.editReply(`The issue has been marked as ${status}.`);
  } catch {
    await interaction.editReply(
      'We reached the Discord "Rate Limit". Please wait 10 minutes before trying again!',
    );
  }
}