const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../../service/s3Client");
const { convertCsv } = require("../../utils/convertCsv");
const Pet = require("../../domain/Pet");
const petRepository = require("../../infra/repository");
const connection = require("../../infra/connect");

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
    const { name: bucketName } = s3.bucket;
    const bucketKey = decodeURIComponent(s3.object.key.replace(/\+/g, " "));
    const dataS3 = await getDataS3({ name: bucketName, key: bucketKey });
    const pets = await convertCsv(dataS3);
    const registerPets = pets.map((pet) => {
      const repository = petRepository(connection);
      return repository.create(new Pet(pet));
    });
    await Promise.all(registerPets);
  } catch (error) {
    console.log(error.message);
  }
};
