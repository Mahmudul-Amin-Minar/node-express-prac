exports.newsletterSignup = (req, res) => {
    res.render('newsletter-signup', {csrf: 'CSRF token GOES here'})
}

exports.newsletterSignupProcess = (req, res) => {
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.redirect(303, '/newsletter-signup/thank-you');
}

exports.newsletterSignupThankYou = (req, res) => {
    res.render('newsletter-signup-thankyou');
}

exports.newsletter = (req, res) => {
    res.render('newsletter', {csrf: 'csrf token'})
}

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log('field data: ', fields);
    console.log('files: ', files);
    res.redirect(303, '/contest/vacation-photo-thank-you')
}

exports.api = {
    newsletterSignup: (req, res) => {
        console.log('CSRF token (from hidden form field): ' + req.body._csrf);
        console.log('Name (from visible form field): ' + req.body.name);
        console.log('Email (from visible form field): ' + req.body.email);
        res.send({result: 'success'})
    },
}