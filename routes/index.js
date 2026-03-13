const router = require('express').Router();

router.use('/', require('./swagger')); // Add this line to include the swagger route

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Hello World!');
});

router.use('/users', require('./users'));

module.exports = router;