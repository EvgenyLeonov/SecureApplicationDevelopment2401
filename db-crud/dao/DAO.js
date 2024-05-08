const {Client} = require("pg");

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
        let output = [];
        this.client
            .connect()
            .then(() => {
                this.client.query(query, params, (err, result) => {
                    if (err) {
                        console.error("Error:", err);
                    } else {
                        output = result.rows;
                        console.log("statement executed: ", output);
                    }

                    // don't forget to close connection
                    this.client
                        .end()
                        .then(() => {
                            console.log("output: ", output);
                            return output;
                        })
                        .catch((err) => {
                            console.error("Error closing connection", err);
                        });
                });
            })
            .catch((err) => {
                console.error("Connection error:", err);
            });
        return [];
    }
}

module.exports.DAO = DAO;