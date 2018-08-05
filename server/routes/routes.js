const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    showTitle: 'Homepage',
    userAgent: req.headers['user-agent'],
    active: { home: true }
  });
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    showTitle: 'Dashboard',
    user: req.user,
    active: { dashboard: true }
  });
});

module.exports = router;
