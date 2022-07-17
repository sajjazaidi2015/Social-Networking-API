const mongoose = require('mongoose');
// Connection string to local instance of MongoDB including database name
// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://localhost:27017/socialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Export connection 
module.exports = mongoose.connection;
