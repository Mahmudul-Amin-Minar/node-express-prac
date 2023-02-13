const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const video_hls = require('./ffmpeg');

// define the storage 
const storage = multer.diskStorage({
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
        const filename = fileName + fileExt;
        // video_hls(filename);
        cb(null, fileName + fileExt);
    }
});

// prepare the final multer upload object 
var upload = multer({
    // dest: 'uploads/',
    storage: storage,
    // fileFilter: (req, file, cb) => {
    //     if(file.mimetype === 'video/mp4'){
    //         cb(null, true);
    //     }else{
    //         // cb(null, false);
    //         cb(new Error("only mp4 file allowed"));
    //     }
    // }
})

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/upload_file', upload.single('file'), (req, res, next) => {
    console.log(req.file);
    res.json({
        message: "success"
    })
});

app.use((err, req, res, next) => {
    if(err){
        if(err instanceof multer.MulterError){
            res.status(500).send("There was an upload error");
        }else{
            res.status(500).send(err.message);
        }
    }else{
        res.send("success");
    }
});

app.listen(3000, () => {
    console.log('app listening  port 3000');
})