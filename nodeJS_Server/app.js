const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const cors = require('cors');
app.use(cors());

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV,'./config');
//process.env.CONNECTION_STRING =  "mongodb://mongodb:27017"
//process.env.PORT=8080
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const users = require('./routes/user');
app.use('/api/users',users);

const categories = require('./routes/category');
app.use('/api/categories',categories);

const movies = require('./routes/movie');
app.use('/api/movies',movies);

const tokens = require('./routes/token');
app.use('/api/tokens',tokens);



app.listen(process.env.PORT);