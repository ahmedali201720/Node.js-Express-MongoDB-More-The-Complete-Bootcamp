const fs = require('fs');
//********************************************************************** */

// Blocking synchronous way

const text = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(text);

const textOut = `This is what we know about avocado : ${text}.\n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);

console.log("File has been written");

// Non-Blocking Asynchronous way

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    console.log(data1);
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        if (err) return console.log('Error');
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
                console.log("the file has been written");
            })
        })
    });
});

console.log('Reading it soon !!!!')

// To check outdated packages "npm outdated"
// To install specific package version "npm install name@version"
// Each package version contains 3 parts 1.18.11 : 
// first is the major number and is related to breaking changes
// Second is the minor number and is related to new features but without breaking previous code
// Third is the patch number and is related to bug fixes

// To update package use "npm update name"
// To uninstall package use "npm uninstall name"