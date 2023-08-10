//ModelsLoader.js// -- Created By Florian Lepage
const fs = require('fs');
const path = require('path');

class ModelsLoader{
    constructor(client) {
        this.client = client;
        this.models = this.loadFunctions(path.join(__dirname+ '/../models/'));
    }

    // Load all the modals from the folder
    loadFunctions(folderPath) {
        const models = {};

        fs.readdirSync(folderPath).forEach((file) => {
            if (file.endsWith('.js') && file.includes("Models")) {
                const modalsModule = require(path.join(folderPath, file));

                let functionName = file.slice(0, -3);
                functionName = functionName.replace("Models", "");


                models[functionName.toLowerCase()] = {
                    embeds: modalsModule.embeds,
                    modals: modalsModule.modals
                };
            }
        });

        return models;
    }
}

module.exports = {
    ModelsLoader
}