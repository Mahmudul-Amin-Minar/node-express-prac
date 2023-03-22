// node process_handling --user Minar --greeting "hello from node"
console.log(process.argv);

function grab(flag){
    let indexAfterFlag = process.argv.indexOf(flag) + 1;
    return process.argv[indexAfterFlag];
}

let user = grab('--user'), greeting = grab('--greeting');
console.log(user, greeting);