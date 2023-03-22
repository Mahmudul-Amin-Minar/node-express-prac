const fs = require('fs');
// let files = fs.readdirSync('./');
let files = fs.readdir('./', (err, files) => {
    if(err){
        throw err;
    }
    console.log(files);
});
// console.log(files);
console.log('reading files...');