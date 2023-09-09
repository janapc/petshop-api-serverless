const { verify } = require("jsonwebtoken");

module.exports.handler = async (event) => {
  const { Authorization: auth } = event.headers;
  const [type, token] = auth.split(" ");
  if (!auth || type !== "Bearer" || !token) {
    return {
      isAuthorized: false,
    };
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
    return {
      isAuthorized: false,
    };
  }

  return {
    isAuthorized: true,
  };
};
