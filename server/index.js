'use strict';

const express = require('express');
const expressListRoutes = require('express-list-routes');
const morgan = require('morgan');

const routes = require('./routes');
const validator = require("./routes/validator");


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
app.use("/validator",validator);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).send(err.message);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Listening on port', port);
  expressListRoutes(app);
});
