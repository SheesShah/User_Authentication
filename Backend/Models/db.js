const mongoose = require('mongoose'); // spelling fix: moongose -> mongoose
const mongoURI = process.env.MONGO_CONN;   

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = mongoose;
