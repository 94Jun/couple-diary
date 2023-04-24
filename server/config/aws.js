const { S3Client } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv")
dotenv.config();

// AWS S3 클라이언트 설정
const s3Client = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

module.exports = s3Client;