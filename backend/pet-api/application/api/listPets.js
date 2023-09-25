const Pet = require("../../domain/Pet");
const petRepository = require("../../infra/repository");
const connection = require("../../infra/connect");
const { formatResponse, Log } = require("../../utils");

module.exports.handler = async (event) => {
  try {
    const query = event.queryStringParameters;
    const pageNumber = Number(query?.pageNumber) || 0;
    const limit = 10;
    let result = {};
    const repository = petRepository(connection);
    const totalPets = await repository.totalPets();
    const startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    if (startIndex > 0) {
      result.previous = pageNumber - 1;
    }
    if (endIndex < totalPets) {
      result.next = pageNumber + 1;
    }
    const pets = await repository.list(limit, startIndex);
    result.pets = pets.map((pet) => new Pet(pet));
    result.totalPets = totalPets;
    return formatResponse({
      statusCode: 200,
      body: result,
    });
  } catch (error) {
    Log.error("listPets", error.message);
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
