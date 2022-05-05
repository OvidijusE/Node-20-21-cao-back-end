/* eslint-disable object-curly-newline */
const { createPetsTable, insertPetDb } = require('../models/petModel');

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

async function createCategory(req, res) {
  console.log('createCategory controller ran');
  try {
    // eslint-disable-next-line camelcase
    const { name, dob, client_email } = req.body;
    const createResult = await insertPetDb(name, dob, client_email);
    res.json(createResult);
  } catch (error) {
    if (error.errno === 1054) {
      console.log('column error');
    }

    console.log('error ===', error.sqlMessage);
    res.sendStatus(500);
  }
}

module.exports = {
  createTable,
  createCategory,
};
