import { ChatInputCommandInteraction } from "discord.js";
import { getChannelConfig, formatConfigContent } from "../../helpers/channel-config.js";

export default async function statusList(interaction: ChatInputCommandInteraction) {
  const action = interaction.options.getString("action");
  const channel = interaction.channel;
  const existingConfig = channel ? await getChannelConfig(channel) : null;

  if (!existingConfig) {
    await interaction.reply(
      "Gitcord has not been initialized in this channel. Please run `/gitcord init` first.",
    );
    return;
  }

  const { config, message } = existingConfig;

  if (action === "add") {
    const newStatus = interaction.options.getString("status", true);

    if (config.statusList.includes(newStatus)) {
      await interaction.reply(
        `The status "${newStatus}" already exists in the issue status list.`,
      );
      return;
    }

    if (newStatus.includes(":") || newStatus.includes(" ")) {
      await interaction.reply(
        `The status "${newStatus}" is not valid. Please use a single word without colons or spaces.`,
      );
      return;
    }

    const isDefault = interaction.options.getBoolean("is-default") ?? false;
    const statusList = config.statusList;
    if (isDefault) {
      statusList.unshift(newStatus);
    } else {
      statusList.push(newStatus);
    }

    const updatedConfig = {
      ...config,
      statusList: [...statusList],
    }

    await existingConfig.message.edit(formatConfigContent(updatedConfig));
    await interaction.reply(`The status "${newStatus}" has been added to the issue status list.`);
    return;
  }

  if (action === "remove"){
    const statusToRemove = interaction.options.getString("status", true);

    if (!existingConfig.config.statusList.includes(statusToRemove)) {
      await interaction.reply(
        `The status "${statusToRemove}" does not exist in the issue status list.`,
      );
      return;
    }

    const filteredStatusList = config.statusList.filter(status => status !== statusToRemove);
    const updatedConfig = {
      ...config,
      statusList: filteredStatusList,
    }
    await existingConfig.message.edit(formatConfigContent(updatedConfig));
    await interaction.reply(`The status "${statusToRemove}" has been removed from the issue status list.`);
  }

  await interaction.reply("This command is not yet implemented.");
}