const User = require("../../domain/User");
const {
  bodyHandler,
  ErrorHandler,
  formatResponse,
  auth,
  Log,
} = require("../../utils");
const userRepository = require("../../infra/database/repository");
const connection = require("../../infra/database/connect");

function addHours(date, hours) {
  return date.setTime(date.getTime() + hours * 60 * 60 * 1000);
}

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
    const expiresIn = addHours(new Date(), 24);
    return formatResponse({
      statusCode: 200,
      body: { token, expiresIn },
    });
  } catch (error) {
    Log.error("signInUser", error.message);
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
