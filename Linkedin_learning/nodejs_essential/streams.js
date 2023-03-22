const fs = require('fs');

// fs.readFile("./chatlog.log", 'utf-8', (err, data) => {
//     console.log(`file read ${data.length}`);
// })

const stream = fs.createReadStream("./javascript.md", 'utf-8');
let data;

stream.once("data", (chunk) => {
    console.log("read stream started");
    console.log("================")
    console.log(chunk);
});

stream.on("data", (chunk) => {
    console.log(`chunk: ${chunk.length}`);
    data += chunk;
})

stream.on("end", () => {
    console.log(`finished: ${data.length}`);
})

console.log('Reading file .... ');