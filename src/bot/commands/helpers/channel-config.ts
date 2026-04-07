import { type TextBasedChannel } from "discord.js";

const HEADER = "**GITCORD CONFIGURATION**";
const JSON_BLOCK_REGEX = /```json\n([\s\S]*?)\n```/;

export type ChannelConfig = {
  alwaysJoinThreads: string[];
};

export async function getChannelConfig(channel: TextBasedChannel) {
  const pins = await channel.messages.fetchPins();
  const messages = pins.items.map(item => item.message);
  const gitcordConfigMessage = messages.find(
    message => 
      message.content.startsWith(HEADER) && 
      message.author.id === process.env.BOT_DISCORD_ID
  );
  if (!gitcordConfigMessage) return null;

  const match = gitcordConfigMessage.content.match(JSON_BLOCK_REGEX);
  if (!match?.[1]) return null;

  let config: ChannelConfig;
  try {
    config = JSON.parse(match[1]) as ChannelConfig;
  } catch {
    return null;
  }

  return { message: gitcordConfigMessage, config };
}

export function formatConfigContent(config: ChannelConfig) {
  return `${HEADER}\n\`\`\`json\n${JSON.stringify(config, null, 2)}\n\`\`\``;
}