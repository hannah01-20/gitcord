import { Client, GatewayIntentBits, Collection } from "discord.js"; 
export class GitcordBot{
  private static instance: GitcordBot;
  public client: Client;
  constructor() {
    this.client = new Client({
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
    ]}); 
    this.client.commands = new Collection();
  }
  public static getInstance(): GitcordBot {
    if (!GitcordBot.instance) {
      GitcordBot.instance = new GitcordBot();
    }
    return GitcordBot.instance;
  }
}