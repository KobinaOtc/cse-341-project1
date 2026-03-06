const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/users', require('./users'));

module.exports = router;