const errorHandler = (error, request, response, next) => {
  response.status(500).send('Something bad happened. This page should be nicer looking');
};

const logErrors = (error, request, response, next) => {
  console.error(error.stack)
  next(error);
};

const notFoundHandler = (request, response) => {
  response.status(404).render('common/not_found')
}

const setDefaultResponseLocals = (request, response, next) => {
  response.locals.query = ''
  next()
}

const checkRoles = (req, res, next) => {
  if (req.session.roles.includes(1)) {
    next()
  } else {
    res.status(403).render('common/forbidden')
  }
}

module.exports = { errorHandler, logErrors, notFoundHandler, setDefaultResponseLocals, checkRoles };
