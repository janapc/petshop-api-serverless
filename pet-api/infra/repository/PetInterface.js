class PetInterface {
  constructor(db) {
    this.db = db;
  }

  async create(pet) {
    return this.db.create(pet);
  }

  async list() {
    return this.db.list();
  }
}

module.exports = PetInterface;
