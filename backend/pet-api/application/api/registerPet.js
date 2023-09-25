const Pet = require("../../domain/Pet");
const petRepository = require("../../infra/repository");
const connection = require("../../infra/connect");
const { bodyHandler, formatResponse, Log } = require("../../utils");

module.exports.handler = async (event) => {
  try {
    const body = bodyHandler(event);
    const pet = new Pet(body);
    const repository = petRepository(connection);
    await repository.create(pet);
    return formatResponse({ statusCode: 201 });
  } catch (error) {
    Log.error("registerPet", error.message);
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
