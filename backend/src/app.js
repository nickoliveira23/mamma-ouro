const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json())
app.use(routes);
app.use(errors())


module.exports = app