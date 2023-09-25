const { verifyToken } = require("../../utils");

module.exports.handler = async (event) => {
  const { Authorization: auth } = event.headers;
  const [type, token] = auth.split(" ");
  if (!auth || type !== "Bearer" || !token) {
    return {
      isAuthorized: false,
    };
  }
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return {
      isAuthorized: false,
    };
  }

  return {
    isAuthorized: true,
  };
};
