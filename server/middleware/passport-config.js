const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { mongoose } = require('./../db/mongoose');
const { User } = require('./../models/User');

const keys = require('./../../config/keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(user => {
          if (user) {
            return done(null, user);
          }

          const photo = profile.photos[0].value.replace('?sz=50', '');

          var newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            photo,
            email: profile.emails[0].value,
          });

          newUser.save().then((user) => {
            return done(null, user);
          });
        })
        .catch(err => {
          return done(err, user);
        });
    }
  )
);
