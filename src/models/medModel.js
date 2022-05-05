/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../dbSetup');

async function createMedsTable() {
  console.log('createMedsDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'CREATE TABLE slscom_vetbee2.medications (id INT AUTO_INCREMENT PRIMARY KEY, name TEXT, description TEXT)';
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

async function insertMedsDb(name, description) {
  console.log('insertMedsDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO medications (name, description) VALUES (?, ?)';
    const [result] = await conn.execute(sql, [name, description]);
    return result;
  } catch (error) {
    console.log('error createMedsDB', error);
    throw error;
  } finally {
    await conn?.end();
  }
}

module.exports = {
  createMedsTable,
  insertMedsDb,
};
