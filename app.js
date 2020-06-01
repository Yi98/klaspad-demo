const express = require('express');
const app = express();
const port = 3000;

// internal imports
const dbConnect = require('./database/db_connect');

// set the view engine to ejs
app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// connect to database
dbConnect.connectToServer((err, client) => {
  if (err) {
    console.log(err);
  }

  // map routes to their specific path
  const routes = require('./routes/route');
  app.use('/', routes);
})


// listen to port
app.listen((process.env.PORT || port), _ => {
  console.log('Server running on ' + port);
});