//Modal.js// -- Created By Florian Lepage
const axios = require("axios");

class Modal {
    constructor() {

    }

    async getGeneration(params) {
        return await new Promise(async (resolve, reject) => {
            const url = "https://alchemy-jpeg--merch-party-api-generate-image.modal.run/";
            const data = {
                "prompt": params.prompt,
                "width": params.width,
                "height": params.height,
                "cfg": params.guidance,
                "steps": params.numInferenceSteps,
                "batch_size": 2,
                "tile": 0,
            };

            await axios.get(
                url,
                { params: data }
            )
                .then((response) => {
                    const json = response.data;

                    if (json.error) {
                        throw new Error(json.error);
                    }

                    resolve(json);
                });
        });
    }
}

module.exports = {
    Modal
}