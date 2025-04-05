import {DiscordCommandHandler} from "#bot/core/discord.js";

export abstract class Module {
    abstract fetchDiscordCommandHandlers(): Map<string, DiscordCommandHandler>;
}

export interface ModuleIndex {
    createNewModule(): Module;
}

export interface ModuleJson {
    indexFile: string;
}

let a = (a:bigint):void => {}