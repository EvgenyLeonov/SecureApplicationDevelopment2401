const fs = require("node:fs/promises");
const path = require("path");

const rootFullPath = path.dirname(process.mainModule.filename);
const dataFullPath = path.join(rootFullPath, "data");

const DOGS = "dogs";

async function readDataRoutines(entitiesName) {
    const rawFileContent = await fs.readFile(path.join(dataFullPath, entitiesName + ".json"), {encoding: 'utf-8'});
    return JSON.parse(rawFileContent);
}

async function saveDataRoutines(entitiesName, items) {
    return fs.writeFile(path.join(dataFullPath, entitiesName + ".json"), JSON.stringify(items), {encoding: 'utf-8'});
}

async function readDogs(){
    return await readDataRoutines(DOGS);
}

async function saveDogs(dogs) {
    await saveDataRoutines(DOGS, dogs);
}

module.exports.readDogs = readDogs;
module.exports.saveDogs = saveDogs;


