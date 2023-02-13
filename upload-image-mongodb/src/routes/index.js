const express = require('express');

const homeController = require('../controllers/home');
const uploadController = require('../controllers/upload');

const router = express.Router();

let routes = (app) => {
    router.get('/', homeController.getHome);
    router.post('/upload', uploadController.uploadFiles);
    router.get('/files', uploadController.getListFiles);
    router.get('/files/:name', uploadController.download);

    return app.use('/', router);
};

module.exports = routes;