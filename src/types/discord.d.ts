import type { ChatInputCommandInteraction, SlashCommandBuilder, Collection } from "discord.js";

declare module "discord.js" {
  interface Command {
    data: SlashCommandBuilder;
    execute(interaction: ChatInputCommandInteraction): Promise<void>;
  }
  interface Client<Ready extends boolean = boolean> {
    commands: Collection<string, Command>;
  }
}

export {};
