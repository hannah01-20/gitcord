import { type ChatInputCommandInteraction } from "discord.js";
import { getChannelConfig, formatConfigContent } from "../../helpers/channel-config.js";

export default async function alwaysJoinThreads(interaction: ChatInputCommandInteraction) {
  if(!interaction.channel || interaction.channel.isDMBased()) {
    await interaction.reply("This command can only be used in a guild channel.");
    return;
  }
  const action = interaction.options.getString("action");
  const user = interaction.options.getUser("user");
  const channelConfig = await getChannelConfig(interaction.channel);

  if (!channelConfig) {
    await interaction.reply("Gitcord has not been initialized in this channel. Please run /gitcord init first.");
    return;
  }
  if (!user) {
    await interaction.reply("You must specify a user to add or remove from always joining threads.");
    return;
  }

  const { message, config } = channelConfig;

  if (action === "add") {
    if (config.alwaysJoinThreads.includes(user?.username || "")) {
      await interaction.reply(`<@${user.id}> is already set to always join threads.`);
      return;
    }
    config.alwaysJoinThreads.push(user?.username);
  }

  if (action === "remove") {
    if (!config.alwaysJoinThreads.includes(user?.username || "")) {
      await interaction.reply(`<@${user.id}> is not currently set to always join threads.`);
      return;
    }
    // Remove the user from the alwaysJoinThreads array by filtering it out
    config.alwaysJoinThreads = config.alwaysJoinThreads.filter(username => username !== user?.username);
  }


  await message.edit(formatConfigContent(config));
  await interaction.reply(`<@${user.id}> has been ${action === "add" ? "added to" : "removed from"} always joining threads.`);
  return;
}