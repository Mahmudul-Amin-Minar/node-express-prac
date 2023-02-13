require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { s3uploadv2, s3getfilev2 } = require('./s3Service');
const uuid = require('uuid').v4;

const app = express();

// const upload = multer({ dest: 'uploads/'});

// single file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//     res.json({status: 'success'});
// });

// multiple file upload 
// app.post('/upload', upload.array('file'), (req, res) => {
//     res.json({status: 'success'});
// });


// multiple fields upload 
// const multipleUpload = upload.fields([
//     {name: 'avatar', maxCount: 1},
//     {name: "resume", avatar: ReadableStreamBYOBRequest, maxCount: 1},
// ])
// app.post('/upload', multipleUpload, (req, res) => {
//     console.log(req.files);
//     res.json({status: 'success'});
// });

// custom file name

// for local storage to disk 
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         const {originalname} = file;
//         cb(null, `${uuid()}-${originalname}`);
//     },
// });

// for aws storage 
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if(file.mimetype.split('/')[0] === 'image'){
        cb(null, true);
    }else{
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
    }
}

// uuid-originalname
const upload = multer({
    storage, 
    // fileFilter,
    // limits: {fileSize: 1000000000, files: 2}
});

app.post('/upload', upload.array('file'), async(req, res) => {
    const file = req.files[0];
    const result = await s3uploadv2(file);
    res.json({status: 'success', result});
});

app.get('/videos', async(req, res) => {
    const result = await s3getfilev2();
    res.json({status: 'success', result});
})

app.use((error, req, res, next) => {
    if(error instanceof multer.MulterError){
        if(error.code === 'LIMIT_FILE_SIZE'){
            return res.json({
                message: 'File is too large',
            })
        }
        if(error.code === 'LIMIT_UNEXPECTED_FILE'){
            return res.json({
                message: 'File must be an image type',
            })
        }
    }
})


app.listen(3000, () => console.log('listening to port 3000'));