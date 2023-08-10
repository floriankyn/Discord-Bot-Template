// DatabaseManager.js -- Created by Florian Lepage
const mysql= require("mysql2/promise");
const fs = require("fs");

class DatabaseManager {
    constructor() {
        this.conn = this.createConnection();
    }

    async loadTables() {
        let sql = fs.readFileSync(__dirname + "/../mysql/tables.sql", "utf8");

        const queries = sql.slice().replace(/\r\n/g, "").split(";")

        queries.pop();

        for (const query of queries) {
            await this.query(query);
        }

    }

    createConnection() {
        const pool = mysql.createPool({
            user: process.env.DB_USERNAME,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 10,
            connectTimeout: 15000,
            queueLimit: 0,
        });

        pool.on('error', (err) => {
            if (err.code === 'ECONNRESET') {
                console.error('Connection was reset by the server. Reconnecting...');
                this.conn = this.createConnection();
            } else {
                throw err;
            }
        });

        return pool;
    }

    async checkConnectionState() {
        return await new Promise(async (resolve, reject) => {
            await this.conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
            await this.loadTables();
            resolve("The connection between the client & the Database has been established.");
        });
    }

    query(query, fields) {
        return new Promise(async (resolve, reject) => {
            const [ Result ] = await this.conn.query(query, fields);

            resolve(Result);
        });
    }
}

module.exports = {
    DatabaseManager,
};