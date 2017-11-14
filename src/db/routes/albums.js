const router = require( 'express' ).Router()
const db = require('../queries/index')

router.get('/', (req, res) => {
  Promise.all([
    db.getAlbums(),
    db.getReviewsReturnByDate()
  ])
  .then((albumInfo, error) => {
    const albums = albumInfo[0]
    const reviews = albumInfo[1]
    res.render('index', {albums, reviews, user: req.session.user})
  })
  .catch(error => res.status(500).render('error', {error}))
})

router.get('/albums/:albumID', (req, res) => {
  const albumID = req.params.albumID
  return db.getAlbumByID(albumID)
  .then(album => {
    console.log("album==== ", album[0]);
    return db.getReviewsByAlbumID(album[0].id)
    .then(reviews => {
      console.log("reviews==== ", reviews);
      res.render('album', {album, reviews, user: req.session.user})
    })
  })
  .catch(error => res.status(500).render('error', {error}))
})

module.exports = router
