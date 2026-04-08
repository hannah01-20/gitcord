import type {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  Collection,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

declare module "discord.js" {
  interface Command {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder;
    execute(interaction: ChatInputCommandInteraction): Promise<void>;
    autoComplete?(interaction: AutocompleteInteraction): Promise<void>;
  }
  interface Client<Ready extends boolean = boolean> {
    commands: Collection<string, Command>;
  }
}

export {};
