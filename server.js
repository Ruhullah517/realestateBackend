const path = require('path');
// Import dependencies
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const app = require('./app'); 



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message || err);
    process.exit(1); // Exit process if connection fails
  });

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

