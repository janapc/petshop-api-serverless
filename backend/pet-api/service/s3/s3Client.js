const { S3Client } = require("@aws-sdk/client-s3");

module.exports = () => {
  const config = {
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESSKEY,
      secretAccessKey: process.env.S3_SECRETKEY,
    },
    endpoint: process.env.S3_ENDPOINT,
  };
  return new S3Client(config);
};
