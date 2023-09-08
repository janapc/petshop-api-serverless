class UserSqliteRepository {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async create(user) {
    const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      this.#db.run(query, [user.email, user.password], function (error) {
        if (error) return reject(error);
        return resolve(this.lastID);
      });
    });
  }

  async findOne(user) {
    const query = `SELECT id, email FROM users WHERE email = ? AND password = ?`;
    return new Promise((resolve, reject) => {
      this.#db.get(
        query,
        [user.email, user.password],
        function (error, result) {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    });
  }
}

module.exports = UserSqliteRepository;
