const fs = require('fs');

fs.renameSync('./lib', './Your-new-directory/lib');
console.log("directiry moved");