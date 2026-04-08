import { type TextBasedChannel, type Message } from "discord.js";

const HEADER = "**GITCORD CONFIGURATION**";
const JSON_BLOCK_REGEX = /```json\n([\s\S]*?)\n```/;

export type ChannelConfig = {
  alwaysJoinThreads: string[];
  issueStatus: string[];
};

export type T_ChannelConfigMessage = {
  message: Message;
  config: ChannelConfig;
}

export async function getChannelConfig(channel: TextBasedChannel): Promise<T_ChannelConfigMessage | null> {
  let fetchedChannel: TextBasedChannel = channel;

  if (channel.isThread()) {
    const parentChannel = channel.parent;
    if (!parentChannel || !parentChannel.isTextBased()) return null;
    fetchedChannel = parentChannel;
  }

  const pins = await fetchedChannel.messages.fetchPins();
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