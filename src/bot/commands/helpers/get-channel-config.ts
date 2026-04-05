import { type TextBasedChannel } from "discord.js";
export async function getChannelConfig(channel: TextBasedChannel) {
  const pins = await channel.messages.fetchPins();
  console.log(pins);
  const messages = pins.items.map(item => item.message);
  const gitcordConfig = messages.find(message => message.content.startsWith("**GITCORD CONFIG**"));
  return gitcordConfig;
}