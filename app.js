const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const buyerRoutes = require('./routes/buyerRoutes'); // Import buyer-related routes

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Route Handling
app.use('/api/buyer', buyerRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;