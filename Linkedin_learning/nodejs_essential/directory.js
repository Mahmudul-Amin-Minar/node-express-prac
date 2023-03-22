const fs = require('fs');

if(fs.existsSync("Your-new-directory")){
    console.log("already exist");
}else{
    fs.mkdir("Your-new-directory", function(err){
        if(err){
            console.log(`Error: ${err}`);
        }else{
            console.log("directory created");
        }
    })
}
