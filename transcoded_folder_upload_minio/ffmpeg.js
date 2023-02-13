const { exec, execFile } = require('child_process');

const video_hls = (fileName) => { 
    console.log(fileName);
    exec(`bash create-vod-hls-modified.sh ./uploads/${fileName}`, (err, stdout, stderr) => {
        console.log(stdout);
        // console.log(stderr.toString());
        if(err !== null){
            console.log(`exec error: ${err}`);
        }
    })
}

module.exports = video_hls;