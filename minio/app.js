const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
dotenv.config();

const { minioUploader,minioBuckets } = require('./file-uploader');
const video_hls = require('./ffpmeg');

const app = express();

const remote_storage = multer.memoryStorage();
const local_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // folder path making if not exist
        const folder = './uploads/';
        fs.mkdirSync(folder, {recursive: true});
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
                            .replace(fileExt, "")
                            .toLowerCase()
                            .split(" ")
                            .join("-") + "-" + Date.now();
        // console.log(fileName);
        const foldername = fileName;
        cb(null, fileName + fileExt);
    }
});

const remote_upload = multer({
    storage: remote_storage,
});

const local_upload = multer({
    storage: local_storage,
})

// app.post('/upload', upload.single('file'), async(req, res) => {
//     const file = req.file;
//     console.log(file);
//     const result = await minioUploader(file);
//     res.json({status: 'success', result});
// });

// app.post('/upload', remote_upload.single('file'), minioUploader);
app.post('/upload', local_upload.single('file'), (req, res, next) => {
    console.log(req.file);
    if(req.file){
        video_hls(req.file.filename);
    }
    res.json({
        message: "success"
    })
})

app.get('/list-bucket', minioBuckets);

app.listen(3000, () => console.log('listening to port 3000'));