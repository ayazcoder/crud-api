const express = require("express");
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const PORT = process.env.PORT || 3001;
const mongodb = require('mongodb');


app.get('/',(req, res)=>{
  res.send('hello node js api')
})
  // Start your Express.js server
  app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
  });

