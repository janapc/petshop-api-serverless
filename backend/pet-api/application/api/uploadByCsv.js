const { PutObjectCommand } = require("@aws-sdk/client-s3");
const parser = require("lambda-multipart-parser");

const {
  formatResponse,
  ErrorHandler,
  verifyToken,
  Log,
} = require("../../utils");
const s3Client = require("../../service/s3/s3Client");

async function extractFile(event, email) {
  const result = await parser.parse(event);
  const { content, filename, contentType } = result.files[0];
  if (contentType !== "text/csv") {
    throw new ErrorHandler("extractFile", "type file invalid", 400);
  }
  return {
    content,
    filename: `${email}__${filename}`,
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

function extractEmail(headers) {
  const auth = headers.authorization;
  const [_, token] = auth.split(" ");
  const decodedToken = verifyToken(token);
  if (!decodedToken.email) {
    throw new ErrorHandler("extractEmail", "data invalid, try again", 400);
  }
  return decodedToken.email || null;
}

module.exports.handler = async (event) => {
  try {
    const email = extractEmail(event.headers);
    const file = await extractFile(event, email);
    await uploadBucketFile(file);
    return formatResponse({
      statusCode: 200,
      body: { message: "upload file success" },
    });
  } catch (error) {
    Log.error("uploadByCsv", error.message);
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
