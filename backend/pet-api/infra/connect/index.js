const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const petSchema = require("./petSchema");
const { Log } = require("../../utils");

const filepath = "petShop.sqlite";

function connectionDb() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  }
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) Log.error("connectionDb", error.message);
  });
  initialTable(db);
  Log.success("connectionDb", "Connection with SQLite has been established");
  return db;
}

function initialTable(db) {
  db.serialize(() => {
    db.run(petSchema);
  });
}

process.on("SIGINT", () =>
  db.close(() => {
    process.exit(0);
  })
);

module.exports = connectionDb();
