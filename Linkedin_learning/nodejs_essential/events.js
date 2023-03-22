const events = require('events');

let emitter = new events.EventEmitter();

emitter.on('customEvent', (message, user) => {
    console.log(`${user}: ${message}`);
});

emitter.emit('customEvent', 'Hello world', 'computer');
emitter.emit('customEvent', 'thats cool', 'minar');

process.stdin.on("data", (data) => {
    const input = data.toString().trim();
    if(input === 'exit'){
        emitter.emit("customEvent", "goodbye", "process");
        process.exit();
    }else{
        emitter.emit("customEvent", data.toString().trim(), 'terminal');
    }
})