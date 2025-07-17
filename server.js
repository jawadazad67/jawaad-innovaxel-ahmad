const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const urlController = require('./controllers/urlController');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//for frontend
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
  res.render('index', { shortUrl: null, error: null });
});

//routes
app.use('/shorten', urlRoutes); 
app.get('/:code', urlController.getOriginalUrl);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
