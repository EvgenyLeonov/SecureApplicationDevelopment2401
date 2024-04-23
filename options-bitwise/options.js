const read = 4;     //00000 100
const write = 2;    //00000 010
const execute = 1;  //00000 001

// | <- bitwise OR operator
// means: 1 OR 0 = 1; 1 OR 1 = 1; 0 OR 0 = 0;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR

const myPermissionsRw = read | write;
console.log(myPermissionsRw);
//6 => 110
//e => 001
//r => 100
printPermissions(myPermissionsRw);

const myPermissionsRe = read | execute;
console.log(myPermissionsRe);
//read + execute = 5 (dec) = 101 (binary)
printPermissions(myPermissionsRe);

function printPermissions(p){
    //& <- bitwise AND operator
    // 1 AND 1 = 1; otherwise = 0;
    console.log("read permission? => " + (p & read ? "yes" : "no"));
    console.log("write permission? => " + (p & write ? "yes" : "no"));
    console.log("execute permission? => " + (p & execute ? "yes" : "no"));
}