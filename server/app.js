require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const session = require("express-session");
const MongoStore = require('connect-mongo')(session);

require('./configs/database');
require('./configs/cloudinary');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/public')));

// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
require('./passport')(app);


app.use('/api', require('./routes'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/closet', require('./routes/closet'));

// For any routes that starts with "/api", catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// For any other routes, redirect to the index.html file of React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error("----- An error happened -----");
  console.error(err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500);

    // A limited amount of information sent in production
    if (process.env.NODE_ENV === 'production')
      res.json(err);
    else
      res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))));
  }
});

module.exports = app;
