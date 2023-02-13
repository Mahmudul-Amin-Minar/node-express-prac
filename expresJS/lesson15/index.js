const express = require('express');
const multer = require('multer');
const path = require('path');


const app = express();
const UPLOADS_FOLDER = './uploads/';

// define the storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        // Important File.pdf -> important-file-1823678.pdf 
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
                                .replace(fileExt, "")
                                .toLowerCase()
                                .split(" ")
                                .join('-') + "-" + Date.now();
        cb(null, fileName+fileExt);
    },
})

var upload = multer({
    storage: storage,
    limits: {
        //fileSize: 1000000,
    },
    fileFilter: (req, file, cb) => {
        if(file.fieldname === 'avatar'){
            if(
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'
            ){
                cb(null, true);
            }else{
                cb(new Error("Only .jpg .png .jpeg allowed"));
            }
        }else if(file.fieldname === 'doc'){
            if(file.mimetype === 'application/pdf'){
                cb(null, true);
            }else{
                cb(new Error("Only .pdf form is allowed"));
            }
        }else{
            cb(new Error('There was an unknown error'));
        }
    },
})

// application route 
app.post('/', upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'doc', maxCount: 1}
]), (req, res) => {
    console.log(req.files);
    res.send('File upload');
});

app.use((err, req, res, next) => {
    if(err){
        if(err instanceof multer.MulterError){
            res.status(500).send("There was an upload error!");
        }else{
            res.status(500).send(err.message);
        }
    }else{
        res.send("success");
    }
})

app.listen(3000, () => {
    console.log('app listening at port 3000');
});