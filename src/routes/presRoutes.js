/* eslint-disable no-unused-vars */
const express = require('express');
const mysql = require('mysql2/promise');
const { createTable } = require('../controller/presController');
const { dbConfig } = require('../dbSetup');

const controller = require('../controller/presController');

const presRoutes = express.Router();

// ROUTES //

presRoutes.post('/pres/create', controller.createTable);

presRoutes.post('/pres', controller.presCategory);

presRoutes.get('/pres', async (req, res) => {
  let conn;
  try {
    // 1 prisijungti
    conn = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM `prescriptions`';
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error in get pres ===', error.message);
    res.status(500).json('something went wrong');
  } finally {
    conn?.end();
  }
});

presRoutes.get('/pres/pets', async (req, res) => {
  let conn;
  try {
    // 1 prisijungti
    conn = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM prescriptions LEFT JOIN pets ON pets.id = prescriptions.id LEFT JOIN medications ON prescriptions.medication_id = medications.id';
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error in get pets ===', error.message);
    res.status(500).json('something went wrong');
  } finally {
    conn?.end();
  }
});

presRoutes.get('/pres/pets/:id', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [data] = await conn.execute(`
    SELECT *
    FROM prescriptions
    LEFT JOIN medications
    ON medications.id = prescriptions.medication_id
    WHERE prescriptions.pet_id = ${req.params.id}
    `);

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server error. Please try again.' });
  } finally {
    await conn?.end();
  }
});

module.exports = presRoutes;
