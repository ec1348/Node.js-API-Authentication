const express = require('express');
const app = express();  
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import route
const authRoute = require('./routes/auth');

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connect to DB')
);

//middleware
app.use(express.json());
//Route Middleware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log("Server is running"));