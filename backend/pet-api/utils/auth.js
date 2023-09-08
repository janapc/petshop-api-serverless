const { verify } = require("jsonwebtoken");

const ErrorHandler = require("./ErrorHandler");

function validToken(event) {
  const { authorization } = event.headers;
  if (!authorization) {
    throw new ErrorHandler(
      "validTokenError",
      "missing authorization header",
      401
    );
  }
  const [type, token] = authorization.split(" ");
  if (type !== "Bearer" || !token) {
    throw new ErrorHandler(
      "validTokenError",
      "unsupported authorization type",
      401
    );
  }

  const decodedToken = verify(
    token,
    process.env.JWT_SECRET,
    {
      audience: "api-users",
    },
    function (_, decoded) {
      return decoded ? decoded : null;
    }
  );
  if (!decodedToken) {
    throw new ErrorHandler("validTokenError", "invalid token", 401);
  }
  return decodedToken;
}

module.exports = { validToken };
