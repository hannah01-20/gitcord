import { GitcordBot } from "../../gitcord-bot.js";
import { Events, MessageFlags } from "discord.js";

export async function pingEvent() {
  const client = GitcordBot.getInstance().client;

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(`Received interaction: ${interaction}`);
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command found for ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ 
        content: "There was an error while executing this command!", 
        flags: MessageFlags.Ephemeral
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral
      })
    }
  }
})
}