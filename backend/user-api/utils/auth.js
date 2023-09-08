const { sign } = require("jsonwebtoken");

function generateToken(user) {
  return sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
    audience: "api-users",
  });
}

module.exports = { generateToken };
