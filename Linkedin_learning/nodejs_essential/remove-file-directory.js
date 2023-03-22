const fs = require('fs');

// fs.unlinkSync('./project.config.js');
// fs.unlink('./project.config.js', function(err){
//     if(err){
//         console.log(err);
//     }
//     console.log('file removed')
// })

// fs.rmdir('./assets', function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("directory removed");
//     }
// })

fs.readdirSync('./config').forEach((file) => {
    fs.renameSync(`./config/${file}`, `./lib/${file}`);
})
console.log("files removed");
fs.rmdirSync('./config');
console.log('folder removed');