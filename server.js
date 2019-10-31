'use strict';

// app dependencies
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-overide');

// enviornment variables
require('dotenv').config();

// app setup
xonst app = express();
const PORT = process.env.PORT || 3001;

// express middleware
// utilize expressjs functionality to parse the body of the request
app.use(express.urlencoded({ extended: true}));
// specify a directory for static resources
app.use(express.static('./public'));

app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    // look in the urlencoded POST body and delete it
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}))

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');