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
    const sql = 'SELECT * FROM pets';
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error in get pets ===', error.message);
    res.status(500).json('something went wrong');
  } finally {
    conn?.end();
  }
});
vetRoutes.get('/pets/archived', async (req, res) => {
  let conn;
  try {
    // 1 prisijungti
    conn = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM pets WHERE archived = 0';
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error in get pets ===', error.message);
    res.status(500).json('something went wrong');
  } finally {
    conn?.end();
  }
});

vetRoutes.delete('/pets/:id', async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    console.log('id===', id);
    conn = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'UPDATE pets SET archived = 1 WHERE id = ?';
    const [rows] = await conn.execute(sql, [id]);
    res.json(rows);
  } catch (error) {
    console.log('error in archive pets ===', error.message);
    res.status(500).json('something went wrong');
  } finally {
    conn?.end();
  }
});

vetRoutes.get('/pets/join', async (req, res) => {
  let conn;
  try {
    // 1 prisijungti
    conn = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM logs LEFT JOIN pets ON logs.pet_id = pets.id';
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error JOIN pets ===', error.message);
    res.status(500).json('something went wrong');
  } finally {
    conn?.end();
  }
});

module.exports = vetRoutes;
