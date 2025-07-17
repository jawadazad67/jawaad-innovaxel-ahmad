const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const urlController = require('./controllers/urlController');

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // To parse JSON bodies

// Mount routes
app.use('/shorten', urlRoutes); // for CRUD
app.get('/:code', urlController.getOriginalUrl); // for redirect

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
