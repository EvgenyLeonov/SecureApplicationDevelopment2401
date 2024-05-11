const fs = require("fs");
class Log {
    constructor(path) {
        this.path = path;
    }

    log(message) {
        const logStream = fs.createWriteStream(this.path, { flags: "a" });
        logStream.write(`[${(new Date()).toISOString()}] ${message}\n`);
        logStream.end();
    }
}


module.exports.Log = Log;