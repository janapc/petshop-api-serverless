class UserInterface {
  constructor(db) {
    this.db = db;
  }

  async create(user) {
    return this.db.create(user);
  }

  async findOne(user) {
    return this.db.findOne(user);
  }
}

module.exports = UserInterface;
