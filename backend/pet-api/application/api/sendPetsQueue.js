const { GetObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = require("../../service/s3/s3Client");
const Producer = require("../../service/sqs/Producer");
const sqsClient = require("../../service/sqs/sqsClient");
const { convertCsv, Log } = require("../../utils");
const Pet = require("../../domain/Pet");

async function getDataS3({ name, key }) {
  const client = s3Client();
  const command = new GetObjectCommand({
    Bucket: name,
    Key: key,
  });
  const response = await client.send(command);
  const dataCsv = await response.Body.transformToString();
  return dataCsv;
}

module.exports.handler = async (event) => {
  try {
    const s3 = event.Records[0].s3;
    const email = s3.object.key.split("__")[0];
    const { name: bucketName } = s3.bucket;
    const bucketKey = decodeURIComponent(s3.object.key.replace(/\+/g, " "));
    const dataCsv = await getDataS3({ name: bucketName, key: bucketKey });
    const data = await convertCsv(dataCsv);
    const clientSqs = sqsClient();
    const producer = new Producer(clientSqs);
    const registerPets = data.map((pet) => {
      return producer.sendMessage({
        message: JSON.stringify({ pet: new Pet(pet), email }),
        queueName: process.env.SQS_QUEUE_REGISTER_PET_NAME,
        groupId: "register-pet",
      });
    });
    await Promise.all(registerPets);
  } catch (error) {
    Log.error("sendPetsQueue", error.message);
  }
};
