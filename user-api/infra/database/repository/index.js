const UserInterface = require("./UserInterface");
const UserSqliteRepository = require("./UserSqliteRepository");

module.exports = (connection) => {
  return new UserInterface(new UserSqliteRepository(connection));
};
