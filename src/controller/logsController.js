const { createLogsTable, insertLogsDb } = require('../models/logsModel');

async function createTable(req, res) {
  console.log('createTable controller ran');
  try {
    const createResult = await createLogsTable();
    res.json(createResult);
  } catch (error) {
    console.log('error createTable ===', error);
    res.sendStatus(500);
  }
}

async function logsCategory(req, res) {
  console.log('logsCategory controller ran');
  try {
    // eslint-disable-next-line camelcase
    const { pet_id, description, status } = req.body;
    const createResult = await insertLogsDb(pet_id, description, status);
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
  logsCategory,
};
