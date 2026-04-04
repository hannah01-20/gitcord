import { GitcordBot } from "../../gitcord-bot.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export async function commandsHandler(){
  const client = GitcordBot.getInstance().client;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  const commandsPath = path.join(__dirname, "..", "cmd");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".ts") || file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commandModule = await import(pathToFileURL(filePath).href);
    const command = commandModule.default ?? commandModule;
  
    if (!command?.data?.name) {
      continue;
    }
    client.commands.set(command.data.name, command);
    console.log(`Registered command: ${command.data.name}`);
  }
}