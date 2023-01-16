const {S3} = require('aws-sdk');
const uuid = require('uuid').v4;

exports.s3uploadv2 = async(file) => {
    const s3 = new S3();

    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${uuid()}-${file.originalname}`,
        Body: file.buffer,
    };
    const result = await s3.upload(param).promise();
    return result;
};

exports.s3getfilev2 = async() => {
    try{
        S3.config.setPromisesDependency();
        S3.config.update({
            accessKeyId: env.process.AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY,
            region: 'use-east-1'
        });
        const s3 = new S3.S3();
        const response = await s3.listObjectV2({
            Bucket: 'onnorokomvideos'
        }).promise();
        return response;
    } catch(e){
        console.log('error:', e );
    }
}