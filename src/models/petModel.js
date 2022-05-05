/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../dbSetup');

async function createPetsTable() {
  console.log('createPetsDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'CREATE TABLE slscom_vetbee2.pets (id INT AUTO_INCREMENT PRIMARY KEY, name TEXT, dob INT, client_email TEXT, archived INT)';
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

async function insertPetDb(name, dob, client_email) {
  console.log('insertCatDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO pets (name, dob, client_email) VALUES (?, ?, ?)';
    const [result] = await conn.execute(sql, [name, dob, client_email]);
    return result;
  } catch (error) {
    console.log('error createPetDB', error);
    // return false
    throw error;
  } finally {
    await conn?.end();
  }
}

module.exports = {
  createPetsTable,
  insertPetDb,
};
