const { pbkdf2Sync } = require("crypto");

const { ErrorHandler } = require("../utils");

class User {
  #errorName = "userError";

  constructor({ username, password }) {
    this._valid({ username, password });
    const hashPassword = this._generatePassword(password);
    this.username = username;
    this.password = hashPassword;
  }

  _valid({ username, password }) {
    if (!username || !password) {
      throw new ErrorHandler(
        this.#errorName,
        `username and password parameters are mandatory`,
        400
      );
    }
    if (!/^[a-zA-Z]{3,}$/g.test(username)) {
      throw new ErrorHandler(
        this.#errorName,
        `username parameter must be more than 3 characters and only worlds`,
        400
      );
    }
    if (password.length < 8) {
      throw new ErrorHandler(
        this.#errorName,
        `password parameter must be more than 8 characters`,
        400
      );
    }
  }

  _generatePassword(password) {
    return pbkdf2Sync(
      password,
      process.env.SALT,
      100000,
      64,
      "sha512"
    ).toString("hex");
  }
}

module.exports = User;
