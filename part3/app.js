const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV,'./config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const users = require('./routes/user');
app.use('/api/users',users);

app.listen(process.env.PORT);