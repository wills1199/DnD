const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

require('./routes/authRoutes')(app);

//Heroku injects dynamic env port var
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));