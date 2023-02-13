// fs.writeFileSync('myfile.txt', 'hello programmers how are up');

// const data = fs.readFileSync('myfile.txt');
// fs.readFile('myfile.txt', (err, data) => {
//     console.log(data.toString());
// });
// console.log('helllo');
// console.log(data.toString());
const School = require('./school');

const school = new School();
// register a listener for bellRing event
school.on('bellRing', ({ period, text }) => {
    console.log(`we need to run because ${period} ${text}`);
});

school.startPeriod();

// // raise an event
// setTimeout(() => {
//     emitter.emit('bellRing', {
//         period: 'first',
//         text: 'period ended',
//     });
// }, 2000);
