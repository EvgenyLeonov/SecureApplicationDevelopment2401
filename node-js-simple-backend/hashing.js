const crypto = require("node:crypto");

const divider = "|";
const bytesCount = 16;
const enc = "hex";
const keyLen = 64;

module.exports.hash = (password) => {
    const salt = crypto.randomBytes(bytesCount).toString(enc);
    const hashedPassword = crypto.scryptSync(password, salt, keyLen);
    return hashedPassword.toString(enc) + divider + salt;
}

module.exports.isMatch = (passwordToCheck, storedPassword) => {
    const [hashedPassword, salt] = storedPassword.split(divider);
    const bufferHashedPassword = Buffer.from(hashedPassword, enc);
    const bufferPasswordToCheck = crypto.scryptSync(passwordToCheck, salt, keyLen);
    console.log("bufferHashedPassword=" + bufferHashedPassword.toString(enc));
    console.log("bufferStoredPassword=" + bufferPasswordToCheck.toString(enc));
    return crypto.timingSafeEqual(bufferHashedPassword, bufferPasswordToCheck);
}