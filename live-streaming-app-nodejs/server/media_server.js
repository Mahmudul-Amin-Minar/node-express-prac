const NodeMediaServer = require('node-media-server');
const config = require('./config/default').rtmp_server;
const User = require('./database/Schema').User;

nms = new NodeMediaServer(config);
nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    User.findOne({stream_key: stream_key}).then(user => {
        if(!user){
            let session = nms.getSession(id);
            session.reject();
        }
    })
    // User.findOne({stream_key: stream_key}, (err, user) => {
    //     if(!err){
    //         if(!user){
    //             let session = nms.getSession(id);
    //             session.reject();
    //         }else{
    //             // do stuff 
    //         }
    //     }
    // });
});

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};

module.exports = nms;