const contacts = require('../../models/contacts')
const router = require('express').Router()

const checkRoles = (req, res, next) => {
  if (req.session.roles.includes(1)) {
    next()
  } else {
    res.render('common/forbidden')
  }
}

router.use('/new', checkRoles)
router.use('/:contactId', checkRoles)

router.get('/new', (request, response) => {
  return response.render('contacts/new')
})

router.post('/', (request, response, next) => {
  contacts.create(request.body)
    .then(function(contact) {
      if (contact) return response.redirect(`/contacts/${contact[0].id}`)
      next()
    })
    .catch( error => next(error) )
})

router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  contacts.findById(contactId)
    .then(function(contact) {
      if (contact) return response.render('contacts/show', { contact })
      next()
    })
    .catch( error => next(error) )
})


router.delete('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  contacts.destroy(contactId)
    .then(function(contact) {
      if (contact) return response.redirect('/')
      next()
    })
    .catch( error => next(error) )
})

router.get('/search', (request, response, next) => {
  const query = request.query.q
  contacts.search(query)
    .then(function(contacts) {
      if (contacts) return response.render('contacts/index', { query, contacts })
      next()
    })
    .catch( error => next(error) )
})

module.exports = router
