/* eslint-disable no-unused-vars */
const express = require('express');
const mysql = require('mysql2/promise');
const { createTable } = require('../controller/petsController');
const { dbConfig } = require('../dbSetup');
const { createPetsTable } = require('../models/petModel');
const controller = require('../controller/petsController');

const vetRoutes = express.Router();

// ROUTES //

vetRoutes.post('/pets/create', controller.createTable);

vetRoutes.post('/pets', controller.createCategory);

vetRoutes.get('/pets', async (req, res) => {
  let conn;
  try {
    // 1 prisijungti
    conn = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM `pets`';
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error in get pets ===', error.message);
    res.status(500).json('something went wrong');
  } finally {
    conn?.end();
  }
});

module.exports = vetRoutes;
