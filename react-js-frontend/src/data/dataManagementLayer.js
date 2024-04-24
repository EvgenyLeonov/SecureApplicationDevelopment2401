class DAO {
    constructor() {
        this.baseUrl = "http://localhost:3001/";
    }

    postRoutines(url, data) {
        const urlFull = this.baseUrl + url;
        return fetch(urlFull, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
    }

    async fetchRoutines(url) {
        const urlFull = this.baseUrl + url;
        console.log("requesting: " + urlFull);
        let result = null;
        await fetch(urlFull).then((res) => res.json()).then((parsedJson) => result = parsedJson);
        console.log("result=" + JSON.stringify(result));
        if (result.errorStr != null) {
            console.log(result.errorStr);
            result = null;
        }
        return result;
    }

    async login(data) {
        //rename this
        return this.postRoutines("login", data);
    }
}

module.exports.DAO = DAO;