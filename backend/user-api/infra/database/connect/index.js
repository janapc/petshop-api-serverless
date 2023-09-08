const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const userSchema = require("./userSchema");

const filepath = "usersApi.sqlite";

function connection() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  }
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) console.error(error.message);
  });
  initialTable(db);
  console.log("Connection with SQLite has been established");
  return db;
}

function initialTable(db) {
  db.serialize(() => {
    db.run(userSchema);
  });
}

process.on("SIGINT", () =>
  db.close(() => {
    process.exit(0);
  })
);

module.exports = connection();
