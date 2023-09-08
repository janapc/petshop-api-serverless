class PetSqliteRepository {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async create(pet) {
    const query = `INSERT INTO pets (id, name, breed, birthDay, identifyNumberCustomer, createdAt) VALUES (?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      this.#db.run(
        query,
        [
          pet.id,
          pet.name,
          pet.breed,
          pet.birthDay,
          pet.identifyNumberCustomer,
          pet.createdAt,
        ],
        function (error) {
          if (error) return reject(error);
          return resolve(this.lastID);
        }
      );
    });
  }

  async list(limit, startIndex) {
    const query = `SELECT * FROM pets ORDER BY createdAt desc limit ${limit} offset ${startIndex}`;
    return new Promise((resolve, reject) => {
      this.#db.all(query, (error, row) => {
        if (error) return reject(error);

        return resolve(row);
      });
    });
  }

  async totalPets() {
    const query = `SELECT COUNT(*) as count FROM pets`;
    return new Promise((resolve, reject) => {
      this.#db.get(query, (error, result) => {
        if (error) return reject(error);
        return resolve(result.count);
      });
    });
  }

  async #searchByName(name) {
    const query = `SELECT * FROM pets WHERE name="${name}" `;
    return new Promise((resolve, reject) => {
      this.#db.all(query, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  }

  async #searchById(id) {
    const query = `SELECT * FROM pets WHERE id="${id}" `;
    return new Promise((resolve, reject) => {
      this.#db.all(query, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  }

  async search(value) {
    const searchByName = await this.#searchByName(value);
    if (searchByName.length) return searchByName;
    return this.#searchById(value);
  }
}

module.exports = PetSqliteRepository;
