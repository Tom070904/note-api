// installed packages
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

//middleware
const app = express();
app.use(express.json());
app.use(morgan('dev'));

//moved file
const connectDB = require('./config/dbcon');
const noteRoutes = require('./routes/noteroute')

//con db
connectDB();

//routes
app.use('/api/v1/notes', noteRoutes)

//server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});