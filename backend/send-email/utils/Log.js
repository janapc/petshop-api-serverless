class Log {
  static error(fnName, msg) {
    console.error(
      `\x1b[31m[LOG ${fnName} ${new Date().toLocaleString("pt-BR")}] - ${msg}`
    );
  }

  static success(fnName, msg) {
    console.log(
      `\x1b[32m[LOG ${fnName} ${new Date().toLocaleString("pt-BR")}] - ${msg}`
    );
  }
}

module.exports = Log;
