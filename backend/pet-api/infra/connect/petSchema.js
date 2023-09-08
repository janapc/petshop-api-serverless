module.exports = `
  CREATE TABLE IF NOT EXISTS pets (
    id TEXT PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    breed VARCHAR(64) NOT NULL,
    birthDay TEXT NOT NULL,
    identifyNumberCustomer TEXT NOT NULL,
    createdAt TEXT NOT NULL
)`;
