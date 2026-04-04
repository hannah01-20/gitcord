import { REST, Routes } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const commands: Array<Record<string, unknown>> = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsPath = path.join(__dirname, "bot", "commands", "cmd");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(".ts") || file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const commandModule = await import(pathToFileURL(filePath).href);
  const command = commandModule.default ?? commandModule;
  commands.push(command.data.toJSON());
}

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const serverId = process.env.SERVER_ID;

if (!token || !clientId || !serverId) {
  console.error("Missing environment variables(bot token, client ID, or server ID). Please check your .env file.");
  process.exit(1);
}
const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await rest.put(Routes.applicationGuildCommands(clientId, serverId), { body: commands });
    const reloadedCount = Array.isArray(data) ? data.length : 0;
    console.log(`Successfully reloaded ${reloadedCount} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();