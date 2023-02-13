const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started at port: " + PORT);
})

app.get('/', (req, res) => {
    try{
        res.sendFile(__dirname + "/public/index.html");
    }catch(err){
        res.status(500).send("internal server error occurred");
    }
})

app.get("/video", (req, res) => {
    const range = req.headers.range;
    if(!range){
        res.status(400).send("Range must be provided");
    }

    // const videoPath = path.join(__dirname, "public", "video.mp4");
    const videoPath = 'https://joy1.videvo.net/videvo_files/video/free/2013-08/large_watermarked/hd0992_preview.mp4'
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 10**6; // 10 power 6 = 1MB

    // calculating video where to start where to end 
    const start = Number(range.replace(/\D/g, ""));
    console.log(start);
    const end = Math.min(start+chunkSize, videoSize - 1);
    console.log(end);
    const contentLength = end - start + 1;
    console.log(contentLength);

    // setup video header 
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    }

    res.writeHead(206, headers);

    // creating fs.ReadStream(stdin)
    const videoStream = fs.createReadStream(videoPath, {start, end});

    // create live stream pipe line 
    videoStream.pipe(res);
})

app.get("/:file_name", (req, res) => {
    try{
        res.sendFile(__dirname + req.params.file_name);
    }catch (err){
        res.status(500).send("Internal server error occurred");
    }
})