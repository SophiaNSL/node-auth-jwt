const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

// database connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));



app.get('*', checkUser);

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/artworks', requireAuth, (req, res) => res.render('artworks'));
app.use(authRoutes);