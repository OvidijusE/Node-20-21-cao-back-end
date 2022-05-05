/* eslint-disable object-curly-newline */
const { createMedsTable, insertMedsDb } = require('../models/medModel');

async function createTable(req, res) {
  console.log('createTable controller ran');
  try {
    const createResult = await createMedsTable();
    res.json(createResult);
  } catch (error) {
    console.log('error createTable ===', error);
    res.sendStatus(500);
  }
}

async function medsCategory(req, res) {
  console.log('medsCategory controller ran');
  try {
    // eslint-disable-next-line camelcase
    const { name, description } = req.body;
    const createResult = await insertMedsDb(name, description);
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
  medsCategory,
};
