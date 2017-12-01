const router = require('express').Router();
const contactsRoutes = require('./contacts')
const contacts = require('../../models/contacts');
const authenticationRoutes = require('./authentication')
const middlewares = require('../middlewares');

router.get('/', (req, res, next) => {
  if (req.session.email) {
    contacts.findAll()
      .then((contacts) => { res.render('contacts/index', { contacts }) })
      .catch(error => next(error))
  } else {
    res.redirect('/login')
  }
})

router.use('/', authenticationRoutes)

router.use('/new', middlewares.checkRoles)
router.use('/:contactId', middlewares.checkRoles)
router.use('/contacts', contactsRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
