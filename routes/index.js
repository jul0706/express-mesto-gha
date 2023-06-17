const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { createUser, login } = require('../controllers/users');

router.post('/sign-up', createUser);
router.post('/sign-in', login);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res) => {
  res
    .status(404)
    .send({
      message: 'Page not found',
    });
});

module.exports = router;
