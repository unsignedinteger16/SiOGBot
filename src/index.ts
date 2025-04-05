import * as process from "node:process";
import { Loader } from "#bot/core/loader.js"
import path from 'node:path';

if (process.argv.length == 2) {
    let loader = new Loader();
    await loader.appendModuleFolder(path.join(process.argv[1], "out/modules"));
} else {
    switch (process.argv[2]) {
        case 'help':
            console.error("HELP: ");
            console.error(`Syntax: ${process.argv[0]} ${process.argv[1]} [subcommand]`);
            console.error("Without subcommand this runs bot");
            console.error("Subcommands:");
            console.error(" - help: Shows this help screen");
            console.error(" - generate-config: Generates example config");
            console.error(" - update-discord-commands: Update discord commands");
            break;
        case 'generate-config':
            break;
        case 'update-discord-commands':
            break
        default:
            console.error("Invalid subcommand");
            console.error(`Use ${process.argv[0]} ${process.argv[1]} help`);
            break;
    }
}