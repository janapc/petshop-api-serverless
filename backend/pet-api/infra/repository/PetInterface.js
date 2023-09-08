class PetInterface {
  constructor(db) {
    this.db = db;
  }

  async create(pet) {
    return this.db.create(pet);
  }

  async list(limit, startIndex) {
    return this.db.list(limit, startIndex);
  }

  async totalPets() {
    return this.db.totalPets();
  }

  async search(value) {
    return this.db.search(value);
  }
}

module.exports = PetInterface;
