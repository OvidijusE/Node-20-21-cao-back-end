/* eslint-disable object-curly-newline */
const { createPresTable, insertPresDb } = require('../models/presModel');

async function createTable(req, res) {
  console.log('createTable controller ran');
  try {
    const createResult = await createPresTable();
    res.json(createResult);
  } catch (error) {
    console.log('error createPresTable ===', error);
    res.sendStatus(500);
  }
}

async function presCategory(req, res) {
  console.log('createCategory controller ran');
  try {
    // eslint-disable-next-line camelcase
    const { medication_id, pet_id, comment, timestamp } = req.body;
    const createResult = await insertPresDb(medication_id, pet_id, comment, timestamp);
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
  presCategory,
};
