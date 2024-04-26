const dao = require("../data/dao");

module.exports.getSearchForm = async (req, res) => {
    res.render("search/form", {
        userName: req.session.userName
    });
}

module.exports.performSearch = async (req, res) => {
    const desiredDogSize = req.body.dogSize;
    console.log("search for desiredDogSize=" + desiredDogSize);
    const allUsers = await dao.readDogs();
    const results = allUsers.filter((item) => item.dogSize === desiredDogSize);
    console.log("results=" + results.length);
    res.render("search/results", {
        userName: req.session.userName,
        results: results
    });
}