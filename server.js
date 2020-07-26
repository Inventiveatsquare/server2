const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/userModel')
const routes = require('./routes/route.js');
require("dotenv").config({
  path: path.join(__dirname, "./.env")
});

const app = express();


const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://expodev:expodev123@payflex.d7ybj.mongodb.net/payflex?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to the Database successfully')
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one"
        });
      }
      res.locals.loggedInUser = await User.findById(userId);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

app.use('/', routes);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 6000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});