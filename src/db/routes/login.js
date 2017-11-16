const router = require( 'express' ).Router()
const db = require('../queries/index')

router.get('/', (req, res) => {
  console.log("Login:::: ", req.session.originalPage);
  const originalPage = req.session.originalPage
  req.session.originalPage = null
  res.status(200).render('login', {user: null, message:"", originalPage})
})

router.post('/', (req, res) => {
  const {email, password, originalPage} = req.body
  console.log("originalPage In Post:::", originalPage);
  db.findUser( email )
  .then( oldMember => {
    if( !oldMember ) {
      res.status(200).render('login', {user: null, message: "please check your login details"} )
    } else if ( password === oldMember.password ) {
      if (originalPage) {
        req.session.user = oldMember
        res.status(200).redirect( `${originalPage}` )
      } else {
        console.log("oldMember In Post:::", oldMember);
        req.session.user = oldMember
        res.status(200).redirect( `/users/${oldMember.id}` )
      }
    }
    else {
      res.status(200).render('login', {user: null, message: "Error: please try again"} )
    }
  })
})

module.exports = router
