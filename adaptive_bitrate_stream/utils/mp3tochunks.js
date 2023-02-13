// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
// const fs = require('fs');
// const path = require('path');

// const dir = path.join(__dirname, '../songs');
// const des = path.join(__dirname, '../temp/chunks');

// const startTime = new Date();
// console.log('> Start reading files', startTime);

// fs.readdir(dir, (readDirError, files) => {
//     if(readDirError){
//         console.error(readDirError);
//         return;
//     }
//     const countFiles = files.length;
//     console.log(dir);
    
//     files.map(async (file, index) => {
//         const fileName = path.join(dir, file);
//         const {err, stdout, stderr} = await exec(`ffmpeg -i ${fileName} -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${des}/${index}.m3u8`);

//         if(err){
//             console.log(err);
//         }
//         if(countFiles - 1 === index){
//             const endTime = new Date();
//             console.info('< End Preparing files', endTime);
//         }
//     });
// });

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function lsExample() {
  try {
    const { stdout, stderr } = await exec('dir');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}
lsExample()