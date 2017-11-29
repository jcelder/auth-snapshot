const router = require('express').Router()

router.route('/signup')
  .get((req, res) => {
    res.render('authentication/signup')
  })

router.route('/login')
  .get((req, res) => {
    res.render('authentication/login')
  })

module.exports = router
