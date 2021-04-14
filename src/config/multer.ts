import multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import cryto from 'crypto';     // Lib to generate hash codes

// This contains settings for multer, defining how files should be updaloed.

const BUCKET_NAME = process.env.S3_BUCKET_ECOLETA;
const IAM_USER_KEY = process.env.S3_IAM_USER_KEY;
const IAM_USER_SECRET = process.env.S3_IAM_USER_SECRET;

const s3: AWS.S3 = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET
});

export default {
    storage: multerS3({
        s3: s3,
        bucket: '' + BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (request, file, callback) {
            const hash = cryto.randomBytes(6).toString('hex');    // Hash of 6 bytes, in Hex.
            const fileName = `uploads_points/${hash}-${file.originalname}`;
            callback(null, fileName);
        }
    })
}
