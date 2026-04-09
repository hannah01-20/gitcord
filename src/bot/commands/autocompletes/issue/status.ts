import { AutocompleteInteraction } from "discord.js";
import { getChannelConfig } from "../../helpers/channel-config.js";

export async function statusAutoComplete(interaction: AutocompleteInteraction) {
  const channel = interaction.channel;
  if (!channel || channel.isDMBased()) {
    await interaction.respond([]);
    return;
  }

  const channelConfig = await getChannelConfig(channel);
  if (!channelConfig) {
    await interaction.respond([]);
    return;
  }
  const { config } = channelConfig;
  const statusOptions = config.statusList;
  await interaction.respond(
    statusOptions.map(status => ({ name: status, value: status }))
  );
}