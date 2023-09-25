const { verify } = require("jsonwebtoken");

module.exports.verifyToken = (token) => {
  return verify(
    token,
    process.env.JWT_SECRET,
    {
      audience: "api-users",
    },
    function (_, decoded) {
      return decoded ? decoded : null;
    }
  );
};
