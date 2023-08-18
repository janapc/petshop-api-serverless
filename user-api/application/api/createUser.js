const User = require("../../domain/User");
const { bodyHandler, formatResponse } = require("../../utils");
const userRepository = require("../../infra/database/repository");
const connection = require("../../infra/database/connect");

module.exports.handler = async (event) => {
  try {
    const body = bodyHandler(event);
    const user = new User(body);
    const repository = userRepository(connection);
    await repository.create(user);
    return formatResponse({
      statusCode: 201,
    });
  } catch (error) {
    console.log(error.message);
    return formatResponse({
      statusCode: error.code || 500,
      body: {
        error: error.code ? error.message : "Internal Server Error",
      },
    });
  }
};
