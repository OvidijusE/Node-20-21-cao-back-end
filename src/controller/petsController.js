const { createPetsTable } = require('../models/petModel');

async function createTable(req, res) {
  console.log('createTable controller ran');
  try {
    const createResult = await createPetsTable();
    res.json(createResult);
  } catch (error) {
    console.log('error createTable ===', error);
    res.sendStatus(500);
  }
}

module.exports = {
  createTable,
};
