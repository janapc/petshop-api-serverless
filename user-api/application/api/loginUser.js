const User = require("../../domain/User");
const {
  bodyHandler,
  ErrorHandler,
  formatResponse,
  auth,
} = require("../../utils");
const userRepository = require("../../infra/database/repository");
const connection = require("../../infra/database/connect");

module.exports.handler = async (event) => {
  try {
    const body = bodyHandler(event);
    const user = new User(body);
    const repository = userRepository(connection);
    const hasUser = await repository.findOne(user);
    if (!hasUser) {
      throw new ErrorHandler("loginUserError", "invalid credentials", 401);
    }

    const token = auth.generateToken(hasUser);
    return formatResponse({
      statusCode: 200,
      body: { token },
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
