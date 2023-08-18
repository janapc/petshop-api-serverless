const { randomUUID } = require("crypto");
const { ErrorHandler } = require("../utils");

const rgx = {
  birthDay:
    /^(?<day>0[0-9]|[12]\d|3[01])(?:\/|\-)(?<month>0[0-9]|1[0-2])(?:\/|\-)(?<year>\d{4})$/,
  identifyNumber: /^([0-9]{9}|[0-9]{11})$/,
};

class Pet {
  #errorName = "petError";
  #fieldsValid = ["breed", "birthDay", "name", "identifyNumberCustomer"];

  constructor({ id = null, name, breed, birthDay, identifyNumberCustomer }) {
    this.id = id ? id : randomUUID();
    this.name = name;
    this.breed = breed;
    this.birthDay = birthDay;
    this.identifyNumberCustomer = identifyNumberCustomer;
    this._valid();
  }

  _valid() {
    const fieldsErrors = this.#fieldsValid.filter((item) => !this[item]);
    if (fieldsErrors.length) {
      throw new ErrorHandler(
        this.#errorName,
        `the parameter ${fieldsErrors.join(",")} is mandatory`,
        400
      );
    }
    if (!this.identifyNumberCustomer.match(rgx.identifyNumber)) {
      throw new ErrorHandler(
        this.#errorName,
        "the parameter identifyNumberCustomer must have 11 or 9 digit",
        400
      );
    }
    if (!this.birthDay.match(rgx.birthDay)) {
      throw new ErrorHandler(
        this.#errorName,
        "the parameter birthDay is not valid",
        400
      );
    }
  }
}

module.exports = Pet;
