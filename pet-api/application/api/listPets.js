const Pet = require("../../domain/Pet");
const petRepository = require("../../infra/repository");
const connection = require("../../infra/connect");
const { auth, formatResponse } = require("../../utils");

module.exports.handler = async (event) => {
  try {
    auth.validToken(event);
    const repository = petRepository(connection);
    const pets = await repository.list();
    const result = pets.map((pet) => new Pet(pet));
    return formatResponse({
      statusCode: 200,
      body: { result },
    });
  } catch (error) {
    console.log(error.message);
    return formatResponse({
      statusCode: error.code || 500,
      body: { error: error.code ? error.message : "Internal Server Error" },
    });
  }
};
