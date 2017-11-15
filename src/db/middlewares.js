const setDefaultResponseLocals = (request, response, next) => {
  response.locals.query = ''
  next()
}

module.exports = { setDefaultResponseLocals }
