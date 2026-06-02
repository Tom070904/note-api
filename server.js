// installed packages
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

//moved file
const connectDB = require('./config/dbcon');

//con db
connectDB();

//middleware
const app = express();
app.use(express.json());
app.use(morgan('dev'));

//routes