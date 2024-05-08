const {Client} = require("pg");

//TODO https://node-postgres.com/apis/client

class DAO {
    constructor(credentials) {
        this.credentials = credentials;
        this.client = new Client({
            host: this.credentials.host,
            port: this.credentials.port,
            database: this.credentials.database,
            user: this.credentials.username,
            password: this.credentials.password
        });
    }

    printCredentials() {
        console.log(`host=${this.credentials.host}; port=${this.credentials.port}; database=${this.credentials.database}; username=${this.credentials.username}; password=${this.credentials.password != null && this.credentials.password.length > 0 ? "[is set]" : "[is not set]"};`);
    }

    async executeQuery(query, params) {
        await this.client.connect().catch((err) => {
            console.error("Connection error:", err);
        });

        const result = await this.client.query(query, params);

        //don't need to wait
        this.client
            .end()
            .catch((err) => {
                console.error("Error closing connection", err);
            });

        return result.rows;
    }
}

module.exports.DAO = DAO;