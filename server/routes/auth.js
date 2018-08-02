const express = require('express');
const router = express.Router();

const passport = require('passport');

const authenticate = require('./../middleware/authentication-checker');

router.get('/logout', authenticate, (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

router.get('/verify', (req, res) => {
  if(!req.user) {
    return res.send('Unverified');
  }
  res.send('Verified');
});

module.exports = router;
