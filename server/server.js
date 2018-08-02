const path = require('path');

const express = require('express');
const app = express();

const hbs = require('express-handlebars');

const bodyParser = require('body-parser');

const session = require('express-session');
const sessionSecret = require('./../config/keys');

const routes = require('./routes/routes');
const authRoutes = require('./routes/auth');

const flash = require('connect-flash');

const { mongoose } = require('./db/mongoose');

const passportConfig = require('./middleware/passport-config');
const passport = require('passport');

const port = process.env.PORT || 3000;

// Global Vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Static Files
app.use(express.static(path.join(__dirname, './../public')));
/* Middlewares */
app.use(bodyParser.json());
// Express Session
app.use(session({
  secret: sessionSecret.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400000 }
}));
// Passport Init
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use('/', routes);
app.use('/auth', authRoutes);
// Flash Messages
app.use(flash());
// Express Handlebars
app.engine(
  'hbs',
  hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/',
  })
);
app.set('view engine', 'hbs');

// Serving
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = {
    app
};
