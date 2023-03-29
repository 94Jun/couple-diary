const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../../../config/aws");
const fs = require("fs");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);

const uploadToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `memory/${file.filename}`,
    Body: fileStream,
    ContentType: file.mimetype,
  };

  // 파일 s3 업로드
  const result = await s3Client.send(new PutObjectCommand(uploadParams));

  // 로컬 저장 데이터 삭제
  await unlinkAsync(file.path);
};

module.exports = { uploadToS3 };
