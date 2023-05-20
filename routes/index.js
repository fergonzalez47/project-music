const router = require('express').Router();
const { getArtists, getArtistById, newArtist, newAlbum, getArtistAlbums,
    getAlbums } = require('../controllers/controllers.js');


//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


router.get('/', getArtists);
router.get('/album', getAlbums);
router.get('/:id', getArtistById);

router.get('/album/:id', getArtistAlbums);

router.post('/', newArtist);
router.post('/album', newAlbum);

module.exports = router;