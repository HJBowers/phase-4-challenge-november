const router = require( 'express' ).Router()
const moment = require('moment')
const db = require('../queries/index')

router.get('/', (req, res) => {
  Promise.all([
    db.getAlbums(),
    db.getReviewsReturnByDate()
  ])
  .then((albumInfo, error) => {
    const albums = albumInfo[0]
    const reviews = albumInfo[1]
    res.render('index', {albums, reviews, user: req.session.user, moment})
  })
  .catch(error => res.status(500).render('error', {error}))
})

router.get('/albums/:albumID', (req, res) => {
  const albumID = req.params.albumID
  Promise.all([
    db.getAlbumByID(albumID),
    db.getReviewsByAlbumID(albumID)
  ])
  .then((albumInfo,error) => {
    const album = albumInfo[0][0]
    const reviews = albumInfo[1]
    res.render('album', {album, reviews, user: req.session.user, moment})
  })
  .catch(error => res.status(500).render('error', {error}))
})

module.exports = router
