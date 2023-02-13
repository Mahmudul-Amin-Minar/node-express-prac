const { exec, execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const { minioCaller, minioUploader } = require('./file-uploader');

const video_hls = (fileName) => { 
    const command = exec(`bash create-vod-hls-modified.sh ./uploads/${fileName}`, (err, stdout, stderr) => {
        console.log(stdout);
        // console.log(stderr.toString());
        if(err !== null){
            console.log(`exec error: ${err}`);
        }
    })
    command.on('close', (code) => {
        const fileExt = path.extname(fileName);
        const foldername = fileName.replace(fileExt, "");
        const chunkFolderName = path.resolve(__dirname, foldername);
        minioUploader(chunkFolderName);
        // minioCaller(chunkFolderName);
    })
}

module.exports = video_hls;