const {Buffer} = require('buffer');
const Stream = require('stream');

// const buf6 = Buffer.from('hello');
// console.log(buf6);
// console.log(buf6.toString());

const readableStream = new Stream.Readable();
readableStream.push('Hello');
readableStream.push('--');
readableStream.push('World');
readableStream.push(null);

// console.log(readableStream.Buffer);

async function getContentReadStream(readable){
    for await (const chunk of readable){
        console.log(chunk);
        console.log(chunk.toString());
    }
}

getContentReadStream(readableStream);