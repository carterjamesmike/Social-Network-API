const router = require('express').Router();
const appRoutes = require('./thoughtsRoutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', appRoutes);
router.use('/users', userRoutes);

module.exports = router;
