const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./dbSetup');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => res.json('wassup'));

// app.use('/api');

app.all('*'), (req, res) => res.status(404).json({ err: 'Page not found' });

app.listen(PORT, () => console.log('express is ONLINE', PORT));
