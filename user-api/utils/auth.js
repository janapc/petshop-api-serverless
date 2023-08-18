const { sign } = require("jsonwebtoken");

function generateToken(user) {
  return sign(
    { username: user.username, id: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
      audience: "http-api-sls",
    }
  );
}

module.exports = { generateToken };
