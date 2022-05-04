/* eslint-disable no-unused-vars */
const express = require('express');
const mysql = require('mysql2/promise');
const { createTable } = require('../controller/logsController');
const { dbConfig } = require('../dbSetup');

const controller = require('../controller/logsController');

const logsRoutes = express.Router();

// ROUTES //

logsRoutes.post('/logs/create', controller.createTable);

logsRoutes.post('/logs', controller.logsCategory);

logsRoutes.get('/logs', async (req, res) => {
  let conn;
  try {
    // 1 prisijungti
    conn = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM `logs`';
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error in get logs ===', error.message);
    res.status(500).json('something went wrong');
  } finally {
    conn?.end();
  }
});

// archived
// vetRoutes.delete('/posts/:postId', async (req, res) => {
//   let connection;
//   try {
//     const { postId } = req.params;
//     connection = await mysql.createConnection(dbConfig);
//     const sql = 'DELETE FROM posts WHERE id = ?';
//     const [deleteResult] = await connection.execute(sql, [postId]);
//     if (deleteResult.affectedRows !== 1) {
//       res.status(400).json({ success: false, error: `user with id: ${postId}, was not found` });
//       return;
//     }
//     if (deleteResult.affectedRows === 1) {
//       res.json('delete okey');
//       return;
//     }
//     throw new Error('something wrong in delete deleteResult.affectedRows');
//   } catch (error) {
//     console.log('delete route error ===', error.message);
//     res.status(500).json('error in delete posts');
//   } finally {
//     connection?.end();
//   }
// });

module.exports = logsRoutes;
