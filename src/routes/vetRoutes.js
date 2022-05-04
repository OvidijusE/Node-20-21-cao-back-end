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

module.exports = vetRoutes;
