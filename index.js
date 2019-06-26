const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
require('./routes/authRoutes')(app);

// get the port dynamically if deploying in production env
const PORT = process.env.PORT || 5000;

app.listen(PORT);
