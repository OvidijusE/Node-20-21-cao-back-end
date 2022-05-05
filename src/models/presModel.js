/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../dbSetup');

async function createPresTable() {
  console.log('createPresDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'CREATE TABLE slscom_vetbee2.prescriptions (id INT AUTO_INCREMENT PRIMARY KEY, medication_id INT, pet_id INT, comment TEXT, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)';
    console.log('pries uzklausa');
    const [result] = await conn.query(sql);
    console.log('po uzklausos');
    return result;
  } catch (error) {
    console.log('error createTableDB', error);
    // return false
    throw error;
  } finally {
    await conn?.end();
  }
}

async function insertPresDb(medication_id, pet_id, comment) {
  console.log('insertCatDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO prescriptions (medication_id, pet_id, comment) VALUES (?, ?, ?)';
    const [result] = await conn.execute(sql, [medication_id, pet_id, comment]);
    return result;
  } catch (error) {
    console.log('error createPresDB', error);
    // return false
    throw error;
  } finally {
    await conn?.end();
  }
}

module.exports = {
  createPresTable,
  insertPresDb,
};
