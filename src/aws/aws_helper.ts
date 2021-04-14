import * as AWS from 'aws-sdk';
import * as fs from "fs";
import path from 'path';

const BUCKET_NAME = process.env.S3_BUCKET_ECOLETA;
const BUCKET_REGION = process.env.S3_BUCKET_ECOLETA_REGION;
const IAM_USER_KEY = process.env.S3_IAM_USER_KEY;
const IAM_USER_SECRET = process.env.S3_IAM_USER_SECRET;

const s3: AWS.S3 = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    region: BUCKET_REGION
});

export function s3UploadFile(filename: string, s3Directory?: string, contentType?: string) {
    const readStream = fs.createReadStream(filename);
    const fileKey = s3Directory? s3Directory + "/" : "";

    const params: AWS.S3.PutObjectRequest = {
        Bucket: "" + BUCKET_NAME,
        Key: fileKey + path.basename(filename),
        Body: readStream,
        ContentDisposition: 'inline',
        ContentType: contentType
    };

    s3.upload(params, function(err, data) {
        readStream.destroy();
        
        if (err)
            throw err;
        
        console.log('File uploaded successfully at: ' + data.Location);
    });
}

export function s3GetFileURL(fileKey: string) {
    const params = {
        Bucket: "" + BUCKET_NAME,
        Key: fileKey,
        Expires: 86400   // 24h
    };

    try {
        const url = s3.getSignedUrl('getObject', params);
        return url;
    } catch (err) {
        console.log('Failed to download file: ' + err);
        throw err;
    }
}
