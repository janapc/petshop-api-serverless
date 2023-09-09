const { PutObjectCommand } = require("@aws-sdk/client-s3");
const parser = require("lambda-multipart-parser");

const { formatResponse } = require("../../utils");
const { s3Client } = require("../../service/s3Client");

async function extractFile(event) {
  const result = await parser.parse(event);
  const { content, filename } = result.files[0];
  return {
    content,
    filename,
  };
}

async function uploadBucketFile({ filename, content }) {
  const client = s3Client();
  const commandUpload = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: filename,
    Body: content,
  });
  await client.send(commandUpload);
}

module.exports.handler = async (event) => {
  try {
    const file = await extractFile(event);
    await uploadBucketFile(file);
    return formatResponse({
      statusCode: 200,
      body: { message: "upload file success" },
    });
  } catch (error) {
    console.log(error.message);
    return formatResponse({
      statusCode: error.code || 500,
      body: {
        error: error.code
          ? error.message
          : "internal server error, try again later",
      },
    });
  }
};
