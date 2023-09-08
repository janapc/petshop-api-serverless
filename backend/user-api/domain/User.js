const { pbkdf2Sync } = require("crypto");

const { ErrorHandler } = require("../utils");

class User {
  #errorName = "userError";

  constructor({ email, password }) {
    this._valid({ email, password });
    const hashPassword = this._generatePassword(password);
    this.email = email;
    this.password = hashPassword;
  }

  _valid({ email, password }) {
    if (!email || !password) {
      throw new ErrorHandler(
        this.#errorName,
        `email and password parameters are mandatory`,
        400
      );
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      throw new ErrorHandler(
        this.#errorName,
        `email parameter is incorrectly`,
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
