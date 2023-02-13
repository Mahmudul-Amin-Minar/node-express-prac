var Minio = require('minio');
var fs = require('fs');
const e = require('express');
const path = require('path');


var minioClient = new Minio.Client({
    endPoint: process.env.ENDPOINT,
    port: 9000 || process.env.PORT,
    useSSL: false,
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY,
});

const minioCaller = function(foldername){
    minioUploader(foldername);
}


// const minioUploader = async(req, res, next) => {
const minioUploader = async function(foldername) {

    const exist = await minioClient.bucketExists("files");
    if (!exist) {
        await minioClient.makeBucket("files", 'us-east-1');
    }

    var metaData = {
        'Content-Type': 'application/octet-stream',
        'X-Amx-Meta-Testing': 1234,
        'example': 5678
    }
    // var file = req.file;
    // minioClient.fPutObject('images', '1.jpg', file, metaData, function(err, etag){
    //     if(err){
    //         return console.log(err);
    //     }
    //     console.log('File uploaded successfully');
    // });
    // Upload a buffer
    // try{
    try{
        const files = await fs.promises.readdir(foldername);
        console.log("uploading to minio...");
        for(const file of files){
            const filepath = path.join(foldername, file);
            minioClient.fPutObject('files', "new-folder" + "/" + file, filepath, metaData);
        }
    }catch(err){
        console.log(err);
    }
    console.log("uploaded to minio");
        // const objinfo = await minioClient.putObject("files", file.originalname, file.buffer, metaData)
        // const objinfo = await minioClient.putObject("files", "new-folder" + "/" + file.originalname, file.buffer, metaData)
        // console.log(objinfo)
        // res.json({
        //     message: objinfo
        // })
    // }catch(err){
    //     console.log(err)
    //     res.json({
    //         error: err.message
    //     })
    // }
}

console.log(typeof(minioUploader));

const minioBuckets = async(req, res) => {
    minioClient.listBuckets((err, buckets) => {
        if(err){
            res.status(400).json({
                error: err
              });
        }
        res.status(200).json({
            result: buckets
        });
    })
}

module.exports = {
    minioUploader,
    minioBuckets,
    minioCaller,
}