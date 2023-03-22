const collectAnswers = require('./lib/collectAnswers');

const questions = [
    "what is your name?",
    "where do you live?",
    "what are you going to do with node js"
];


const answerEvents = collectAnswers(questions, (answers) => {
    console.log('Thansk for your answers');
    console.log(answers);
    process.exit();
})

answerEvents.on("answer", (answer) => {
    console.log(`the answer is ${answer}`);
})