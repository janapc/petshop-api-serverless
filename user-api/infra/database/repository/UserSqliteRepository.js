class UserSqliteRepository {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async create(user) {
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      this.#db.run(query, [user.username, user.password], function (error) {
        if (error) return reject(error);
        return resolve(this.lastID);
      });
    });
  }

  async findOne(user) {
    const query = `SELECT id, username FROM users WHERE username = ? AND password = ?`;
    return new Promise((resolve, reject) => {
      this.#db.get(
        query,
        [user.username, user.password],
        function (error, result) {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    });
  }
}

module.exports = UserSqliteRepository;
