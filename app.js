const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes')
const addressRoutes = require('./src/routes/addressRoutes')
const appointmentRoutes = require('./src/routes/appointmentRoutes')
const doctorRoutes = require('./src/routes/doctorRoutes') 
const ratingRoutes = require('./src/routes/ratingRoutes') 
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true              
}));
app.use(bodyParser.json());
app.use(cookieParser());


// Routes
app.use('/api', userRoutes);
app.use('/api', addressRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', doctorRoutes);
app.use('/api', ratingRoutes);

module.exports = app;
