//Printify.js// -- Created By Florian Lepage
const axios = require("axios");

class Printify {
    constructor() {

    }

    async getModels(key, image){
        return await new Promise(async (resolve, reject) => {
            let ids = [];

            for(let i = 0; i < image.length; i++) {
                const postData = {
                    file_name: "image.png",
                    contents: Buffer.from(image[i]).toString('base64')
                };

                const config = {
                    headers: { Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}` }
                };

                await axios.post('https://api.printify.com/v1/uploads/images.json', postData, config)
                    .then(response => {
                        ids.push(response.data.id);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }

            resolve(ids);
        });
    }

    async getMockups(model){
        return await new Promise(async (resolve) => {
            const config = {
                headers: { Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}` }
            };

            await axios.post('https://api.printify.com/v1/shops/7834424/products.json', model, config)
                .then(response => {
                    resolve(response.data.images[0].src);
                })
                .catch(error => {
                    console.error(error);
                });
        });
    }
}

module.exports = {
    Printify,
}