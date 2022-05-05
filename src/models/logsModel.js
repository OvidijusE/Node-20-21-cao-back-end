/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../dbSetup');

async function createLogsTable() {
  console.log('createLogsDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'CREATE TABLE slscom_vetbee2.logs (id INT AUTO_INCREMENT PRIMARY KEY, pet_id INT, description TEXT, status TEXT)';
    console.log('pries uzklausa create logs table');
    const [result] = await conn.query(sql);
    console.log('po uzklausos create logs table');
    return result;
  } catch (error) {
    console.log('error createLogsTable', error);
    throw error;
  } finally {
    await conn?.end();
  }
}

async function insertLogsDb(pet_id, description, status) {
  console.log('insertLogsDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO logs (pet_id, description, status) VALUES (?, ?, ?)';
    const [result] = await conn.execute(sql, [pet_id, description, status]);
    return result;
  } catch (error) {
    console.log('error createLogsDB', error);
    throw error;
  } finally {
    await conn?.end();
  }
}

module.exports = {
  createLogsTable,
  insertLogsDb,
};
