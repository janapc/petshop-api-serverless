class PetSqliteRepository {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async create(pet) {
    const query = `INSERT INTO pets (id, name, breed, birthDay, identifyNumberCustomer) VALUES (?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      this.#db.run(
        query,
        [pet.id, pet.name, pet.breed, pet.birthDay, pet.identifyNumberCustomer],
        function (error) {
          if (error) return reject(error);
          return resolve(this.lastID);
        }
      );
    });
  }

  async list() {
    const query = `SELECT * FROM pets`;
    return new Promise((resolve, reject) => {
      this.#db.all(query, (error, row) => {
        if (error) return reject(error);

        return resolve(row);
      });
    });
  }
}

module.exports = PetSqliteRepository;
