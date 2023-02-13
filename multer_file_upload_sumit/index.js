const express = require('express');
const multer = require('multer');
const path = require('path');

// define the storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
                            .replace(fileExt, "")
                            .toLowerCase()
                            .split(" ")
                            .join("-") + "-" + Date.now();
        console.log(fileName);
        cb(null, fileName + fileExt);
    }
});

// prepare the final multer upload object 
var upload = multer({
    // dest: 'uploads/',
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, cb) => {
        if(
            file.mimetype === 'image/png' || 
            file.mimetype === 'image/jpg'
        ){
            cb(null, true);
        }else{
            // cb(null, false);
            cb(new Error("only jpg or image allowed"));
        }
    }
})

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/', upload.single('avatar'), (req, res) => {
    res.send('hello');
});
// app.post('/', upload.array('avatar'), (req, res) => {
//     res.send('hello');
// });
// app.post('/', upload.fields([{name: 'avatar', maxCount: 2}, {name: 'gallery', maxCount: 3}]), (req, res) => {
//     res.send('hello');
// });

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