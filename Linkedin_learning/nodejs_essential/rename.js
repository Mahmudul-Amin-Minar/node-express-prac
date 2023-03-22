const fs = require('fs');

// fs.renameSync("./lib/name.js", "./lib/name-renamed.js");
// console.log("File renamed");

fs.rename('./lib/name-renamed.js', './lib/async-name-renamed.js', function(err){
    if(err){
        console.log(`Error: ${err}`)
    }else{
        console.log("file renamed asynchronously");
    }
})