const { S3Client } = require("@aws-sdk/client-s3");

module.exports.s3Client = () => {
  if (!process.env.IS_OFFLINE)  return new S3Client({});
  return new S3Client({
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESSKEY,
      secretAccessKey: process.env.S3_SECRETKEY,
    },
    endpoint: process.env.S3_ENDPOINT,
  });
};
