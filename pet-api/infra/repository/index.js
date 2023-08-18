const PetInterface = require("./PetInterface");
const PetSqliteRepository = require("./PetSqliteRepository");

module.exports = (connection) => {
  return new PetInterface(new PetSqliteRepository(connection));
};
