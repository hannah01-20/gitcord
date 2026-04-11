import { Events } from "discord.js";
import dotenv from "dotenv";
import { GitcordBot } from "./bot/gitcord-bot.js";
import { commandsHandler } from "./bot/commands/handlers/commands-handler.js";
import eventsHandler from "./bot/commands/events/index.js";

dotenv.config({ quiet: true });

const client = GitcordBot.getInstance().client;

client.once(Events.ClientReady, async () => {
  await commandsHandler();
  await eventsHandler();
  console.log(`Logged in as ${client.user?.tag}`);
});

if (!process.env.BOT_TOKEN || !process.env.BOT_DISCORD_ID) {
  console.error("Missing required environment variables. Please check your .env file.");
  process.exit(1);
}

client.login(process.env.BOT_TOKEN);