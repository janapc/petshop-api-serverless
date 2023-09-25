const Pet = require("../../domain/Pet");
const petRepository = require("../../infra/repository");
const connection = require("../../infra/connect");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.Records[0].body);
  const pet = new Pet(body.pet);
  const repository = petRepository(connection);
  await repository.create(pet);
};
