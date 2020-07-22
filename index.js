const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

const app = express();
//Heroku injects dynamic env port var
const PORT = process.env.PORT || 3000;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

require('./routes/authRoutes')(app);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));