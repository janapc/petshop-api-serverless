const Pet = require("../../domain/Pet");
const petRepository = require("../../infra/repository");
const connection = require("../../infra/connect");
const { formatResponse } = require("../../utils");

module.exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters;
    const repository = petRepository(connection);
    const result = await repository.search(params?.query);
    if (!result || !result.length) {
      return formatResponse({
        statusCode: 404,
        body: { error: "pet not found" },
      });
    }

    const pets = result.map((pet) => new Pet(pet));
    return formatResponse({
      statusCode: 200,
      body: pets,
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
