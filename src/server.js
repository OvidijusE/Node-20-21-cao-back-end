const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./dbSetup');
const vetRoutes = require('./routes/vetRoutes');
const logsRoutes = require('./routes/logsRoutes');
const medRoutes = require('./routes/medRoutes');
const presRoutes = require('./routes/presRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => res.json('wassup'));

app.use('/api', vetRoutes);
app.use('/api', logsRoutes);
app.use('/api', medRoutes);
app.use('/api', presRoutes);

app.all('*', (req, res) => {
  res.status(404).json({ err: 'page not found' });
});

app.listen(PORT, () => console.log(`Express online: ${PORT}`));
