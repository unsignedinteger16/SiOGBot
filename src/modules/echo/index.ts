import {Module} from "#bot/core/module.js";

class EchoModule extends Module {
    constructor() {
        super();

        console.log("Loaded");
    }
}

export const createNewModule= () => new EchoModule();