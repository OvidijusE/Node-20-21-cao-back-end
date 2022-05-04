const express = require('express');
const mysql = require('mysql2/promise');

const vetRoutes = express.Router();
module.exports = vetRoutes;

// POST //

vetRoutes.get('/');
