const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const multiparty = require('multiparty');

const handlers = require('./lib/handler')

const app = express()
const port = process.env.PORT || 3000

const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
]


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.disable('x-powered-by');

app.set('view engine', 'handlebars');
// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
// app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    // res.type('text/plain');
    // res.send('Meadowlark Travel');
    res.render('home');
})

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    // console.log(req.ip);
    res.redirect('www.google.com')
    res.render('about', {fortune: randomFortune});
})

app.get('/headers', (req, res) => {
    res.type('text/plain');
    const headers = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`);
    res.send(headers.join('\n'));
})

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(500).send({error: err.message});
        }
        handlers.vacationPhotoContestProcess(req, res, fields);
    })
})

app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

app.get('/newsletter', handlers.newsletter);
app.post('/api/newsletter-signup', handlers.api.newsletterSignup);



// custom 404 page 
app.use((req, res) => {
    // res.type('text/plain')
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    // res.type('text/plain')
    res.status(500)
    // res.send('500 - Server Error')
    res.render('500')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port};` + `Press Ctrl-C to terminate`
))