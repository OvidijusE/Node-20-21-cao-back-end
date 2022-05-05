/* eslint-disable no-unused-vars */
const express = require('express');
const mysql = require('mysql2/promise');
const { createTable } = require('../controller/medController');
const { dbConfig } = require('../dbSetup');

const controller = require('../controller/medController');

const medRoutes = express.Router();

// ROUTES //

medRoutes.post('/meds/create', controller.createTable);

medRoutes.post('/meds', controller.medsCategory);

medRoutes.get('/meds', async (req, res) => {
  let conn;
  try {
    // 1 prisijungti
    conn = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM `medications`';
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error in get meds ===', error.message);
    res.status(500).json('something went wrong');
  } finally {
    conn?.end();
  }
});

module.exports = medRoutes;
