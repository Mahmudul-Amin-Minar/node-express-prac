const fs = require('fs');

let md = `
    This is a New File
    ==================

    ES6 Template string are cool, the honor whitespace.

    *Template Strings
    *Node file system
    *Reading CLIs
`

fs.writeFile('javascript.md', md.trim(), function(err){
    if(err){
        throw err;
    }
    fs.appendFileSync("javascript.md", "\n\n\n###NodeJS everyone");
    console.log("Markdown created");
})