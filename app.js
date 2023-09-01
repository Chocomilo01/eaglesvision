// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const rootRoute = require('./routes/indexRoute');
const cors = require('cors');
const loggingMiddleware = require('./middlewares/loggingMiddleware'); // Import the logging middleware


require('dotenv').config();
const app = express();

// Add middleware for request logging
app.use(loggingMiddleware);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use('/api/v1', rootRoute);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((error) => {
      console.log('Error connecting to the database:', error);
    });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});