// process.stdout.write("node \n \n");

const questions = [
    "what is your name?",
    "what would you rather be doing",
    "what is your favorite language"
];
const answers = [];

function ask(i=0){
    process.stdout.write(`\n\n\n ${questions[i]}`);
    process.stdout.write(' > ');
}
ask();

process.stdin.on('data', function(data){
    answers.push(data.toString().trim());
    if(answers.length < questions.length){
        ask(answers.length);
    }else{
        process.exit();
    }
})

process.on('exit', function(){
    process.stdout.write('\n\n\n');
    process.stdout.write(`Go ${answers[0]} ${answers[1]} you can finish writing ${answers[2]}`)
})
