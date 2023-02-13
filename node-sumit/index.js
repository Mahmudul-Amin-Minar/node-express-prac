// fs.writeFileSync('myfile.txt', 'hello programmers how are up');

// const data = fs.readFileSync('myfile.txt');
// fs.readFile('myfile.txt', (err, data) => {
//     console.log(data.toString());
// });
// console.log('helllo');
// console.log(data.toString());
const EventEmitter = require('events');

const emitter = new EventEmitter();

// register a listener for bellRing event
emitter.on('bellRing', (period) => {
    console.log(`we need to run because ${period}`);
});

// raise an event
setTimeout(() => {
    emitter.emit('bellRing', 'second period ended');
}, 2000);
