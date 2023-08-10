//Scenario.js// -- Created By Florian Lepage
const sdk = require('api')(process.env.SCENARIO_API_ESM_SYNTAX || '@scenario-api/v1.0#x6xjhilibo50a1');
const axios = require("axios");

class Scenario {
    constructor() {

    }

    async checkApiKey(key) {
        return new Promise(async (resolve, reject) => {
            sdk.auth(`Basic ${Buffer.from(key).toString("base64")}`);

            sdk.getModels(
                {
                    pageSize: '1',
                }
            ).then(({ data }) => resolve(true))
                .catch((err) => reject("API Key is invalid"));
        });
    }

    // returns inferenceId;
    async startGeneration(key, model, prompt, negative, img2img=null) {
        return await new Promise(async (resolve, reject) => {
            sdk.auth(`Basic ${Buffer.from(key).toString("base64")}`);

            const { model_data: modelData = {} } = model[0];

            let params = {
                enableSafetyCheck: false,
                prompt: prompt,
                numInferenceSteps: modelData.inferenceSteps,
                type: img2img === null ? "txt2img" : "img2img",
                guidance: modelData.guidance,
                strength: modelData.strength
            }


            if(modelData.type === "img2img") {
                let ext = model[0].model_image && model[0].model_image.split(".")[1];
                params.image = `data:image/${ext};base64,` + Buffer.from(img2img).toString('base64');
            } else if(img2img !== null) {
                params.image = "data:image/png;base64," + Buffer.from(img2img).toString('base64');
            }

            if(negative !== null) {
                params.negativePrompt = negative;
            }

            sdk.postModelsInferencesByModelId({
                parameters: params
            }, {modelId: model[0].model_id})
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                });
        });
    }

    async startModelVariation(key, modelId, prompt, negative, imgUrl) {
        return await new Promise(async (resolve, reject) => {
            sdk.auth(`Basic ${Buffer.from(key).toString("base64")}`);
            let imgBuffer = await this.downloadImage(imgUrl);

            let params = {
                enableSafetyCheck: false,
                prompt: prompt,
                numInferenceSteps: 30,
                type: 'img2img',
                image: "data:image/png;base64," + imgBuffer,
                strength: 0.75
            }

            if(negative !== null) {
                params.negativePrompt = negative
            }

            sdk.postModelsInferencesByModelId({
                parameters: params
            }, {modelId: modelId})
                .then(({ data }) => resolve(data))
                .catch(err => reject(err));
        });
    }

    async downloadImage(url) {
        return await new Promise(async (resolve, reject) => {
            await axios({
                method: 'get',
                url: url,
                responseType: 'arraybuffer'
            }).then((response) => {
                resolve( Buffer.from(response.data).toString('base64'));
            }).catch((error) => {
                reject(error);
            });
        });
    }

    async getInference(key, modelId, inferenceId) {
        return await new Promise(async (resolve, reject) => {
            sdk.auth(`Basic ${Buffer.from(key).toString("base64")}`);

            sdk.getModelsInferencesByModelIdAndInferenceId({modelId: modelId, inferenceId: inferenceId})
                .then(({ data }) => resolve(data))
                .catch(err => reject(err));
        });
    }

    async getAllModels(key) {
        return new Promise(async (resolve, reject) => {
            sdk.auth(`Basic ${Buffer.from(key).toString("base64")}`);

            let models = [];
            let ArePagesDone = false;
            let paginationToken;
            while(!ArePagesDone) {
                await new Promise(async (resolve) => {
                    await sdk.getModels(
                        {
                            status: 'trained',
                            pageSize: '50',
                            paginationToken: paginationToken,
                        }
                    ).then(({ data }) => {

                        for(const e of data.models) {
                            models.push(
                                {
                                    id: e.id,
                                    name: e.name,
                                }
                            );
                        }

                        if(!data.nextPaginationToken) {
                            ArePagesDone = true;
                            resolve();
                        }

                        paginationToken = data.nextPaginationToken;

                        resolve();
                    })
                        .catch(console.error);
                });
            }

            resolve(models);
        });
    }

    async getPublicModels(key) {
        return new Promise(async (resolve, reject) => {
            sdk.auth(`Basic ${Buffer.from(key).toString("base64")}`);

            let models = [];
            let ArePagesDone = false;
            let paginationToken;
            while(!ArePagesDone) {
                await new Promise(async (resolve) => {
                    await sdk.getModels({
                        privacy: 'public',
                        pageSize: 50,
                        paginationToken: paginationToken,
                    }).then(response => {
                        for(const e of response.data.models) {
                            models.push(
                                {
                                    id: e.id,
                                    name: e.name,
                                }
                            );
                        }

                        if(!response.data.nextPaginationToken) {
                            ArePagesDone = true;
                            resolve();
                        }

                        paginationToken = response.data.nextPaginationToken;

                        resolve();
                    }).catch(error => console.error(error));

                });
            }

            resolve(models);
        });
    }
}

module.exports = {
    Scenario,
}
