const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {
        showTitle: 'Homepage'
    });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        showTitle: 'Dashboard',
        user: req.user
    });
});

module.exports = router;