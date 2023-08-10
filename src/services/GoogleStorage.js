//GoogleStorage.js// -- Created By Florian Lepage

const { Storage } = require('@google-cloud/storage');

class GoogleStorage {
    constructor(bucketName) {
        this.storage = new Storage();
        this.bucketName = bucketName;
    }

    async uploadImage(buffer, destinationPath) {
        try {
            const file = this.storage.bucket(this.bucketName).file(destinationPath);
            await file.save(buffer);
            console.log(`Buffer uploaded to ${this.bucketName}/${destinationPath}.`);
        } catch (error) {
            console.error('Error uploading buffer:', error);
            throw error;
        }
    }

    async retrieveImage(pathInBucket) {
        return await new Promise(async (resolve, reject) => {
            try {
                const file = this.storage.bucket(this.bucketName).file(pathInBucket);

                const options = {
                    version: 'v4',
                    action: 'read',
                    expires: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
                };

                let image = await file.getSignedUrl(options);

                resolve(image[0]);
            } catch (error) {
                throw error;
            }
        });
    }

    async checkConnection() {
        try {
            const [buckets] = await this.storage.getBuckets();
            const bucketExists = buckets.some(bucket => bucket.name === this.bucketName);

            if(bucketExists) {
                console.log('Successfully connected to the bucket.')
            } else {
                console.log('Bucket does not exist.')
            }

            return bucketExists;
        } catch (error) {
            console.error('Error checking connection:', error);
            throw error;
        }
    }
}

module.exports = {
    GoogleStorage
};