const util = require('util');
const multer = require('multer');

const max_size = 2*1024*1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir+'/resources/static/assets/uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    // limits: {fileSize: max_size},
}).single('file');

// util.promisify() makes the exported middleware object can be used with async-await.
let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;