const router = require( 'express' ).Router()
const db = require('../queries/index')

router.get('/', (req, res) => {
  res.status(200).render('login', {user: null, message:""})
})

router.post('/', (req, res) => {
  const {email, password} = req.body
  db.findUser( email )
  .then( oldMember => {
    if( !oldMember ) {
      res.status(200).render('login', {user: null, message: "please check your login details"} )
    } else if ( password === oldMember.password ) {
      req.session.user = oldMember
      res.status(200).redirect( `/users/${oldMember.id}` )
    } else {
      res.status(200).render('login', {user: null, message: "Error: please try again"} )
    }
  })
})

module.exports = router
