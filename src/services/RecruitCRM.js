//RecruitCRM.js//
const FormData = require('form-data');
const axios = require('axios');

class RecruitCRM {
    constructor() {
        this.token = `Bearer ${process.env.RECRUTECRM_API_KEY}`;
        this.url = process.env.RECRUTECRM_API_URL;
    }

    async AssignCandidateToJob(job_slug, candidateId) {
        return await new Promise((resolve) => {
            const options = {
                method: 'POST',
                url: `${this.url}/candidates/${candidateId}/apply`,
                params: { job_slug: job_slug },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.token
                }
            };

            axios(options)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    throw error;
                });
        });
    }

    async getJobInfo(job_slug) {
        return await new Promise(async (resolve) => {
            const options = {
                method: 'GET',
                url: `${this.url}/jobs/${job_slug}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.token
                }
            };


            axios(options)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    throw error;
                });
        });
    }

    async createCandidate(info) {
        return await new Promise(async (resolve) => {
            let configData = {
                first_name: info.firstname,
                last_name: info.lastname,
                email: info.email,
                contact_number: info.phone,
            };

            if (info.linkedin !== "") {
                configData.linkedin = info.linkedin;
            }

            const form = new FormData();
            for (const key in configData) {
                form.append(key, configData[key]);
            }

            const options = {
                method: 'POST',
                url: `${this.url}/candidates`,
                headers: {
                    ...form.getHeaders(),
                    Authorization: this.token
                },
                data: form
            };

            axios(options)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    throw error;
                });
        });
    }

}

module.exports = {
    RecruitCRM
};