const ErrorHandler = require("./ErrorHandler");

function bodyHandler(event) {
  if (!event?.body) {
    throw new ErrorHandler("bodyHandlerError", "missing body", 422);
  }
  return JSON.parse(event.body);
}

module.exports = bodyHandler;
