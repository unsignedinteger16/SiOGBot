import {Module, ModuleJson, ModuleIndex} from '#bot/core/module.js';

import fs from 'node:fs';
import path from 'node:path';
import {getDirectoriesAsync} from "#bot/utils/fs.js";
import {Dirent} from "fs";

export class Loader {
    private modules: Array<Module>;
    private moduleFolderPath: Map<string, string>;

    constructor() {
        this.modules = [];
        this.moduleFolderPath = new Map<string, string>();
    }

    private async checkIfModuleIsValid(modulePath: string): Promise<boolean> {
        if(!fs.existsSync(path.join(modulePath, "module.json"))) return false;

        let importedConfig: ModuleJson = await import(path.join(modulePath, "module.json"), { assert: { type: "json" }});
        if(importedConfig.indexFile == undefined) return false;
        if(!fs.existsSync(importedConfig.indexFile)) return false;

        let moduleImported: ModuleIndex = await import(path.join(modulePath, importedConfig.indexFile));
        if(moduleImported.createNewModule == undefined) return false;

        return true;
    }

    public async appendModuleFolder(modulesPath: string): Promise<void> {
        if(!fs.existsSync(modulesPath)) {
            throw new Error("Trying to load module folder that doesn't exists");
        }


        let folder: Dirent[] = await getDirectoriesAsync(modulesPath);
        for(let i = 0; i < folder.length; i++) {
            console.log(`Appending module ${folder[i].name}`);

            let isValid = await this.checkIfModuleIsValid(path.join(modulesPath, folder[i].name));
            if(!isValid) {
                console.warn("[WARNING] Error when appending module folders: invalid module specified");
                continue;
            }

            if(!this.moduleFolderPath.has(folder[i].name)) {
                throw new Error("Module name conflict");
            }
            this.moduleFolderPath.set(folder[i].name, path.join(modulesPath, folder[i].name));
        }
    }
}