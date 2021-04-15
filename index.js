const express = require('express');
const app = express();  
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import route
const authRoute = require('./routes/auth');

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(console.log('connect to db'));

//middleware
app.use(express.json());
//Route Middleware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log("Server is running"));