const router = require('express').Router();

const { CreateArtistValidation,
deleteArtistValidation,
CreateAlbumValidation,
deleteAlbumValidation } = require("../validation.js");

const { getArtists, getArtistById, newArtist, newAlbum, getArtistAlbums,
    getAlbums, updateArtist, updateAlbum, deleteArtist, deleteAlbum } = require('../controllers/controllers.js');


//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


router.get('/', getArtists);
router.get('/album', getAlbums);
router.get('/:id', getArtistById);
router.get('/album/:id', getArtistAlbums);

router.put('/:id', updateArtist);
router.put('/album/:id', updateAlbum);

router.post('/', CreateArtistValidation, newArtist);
router.post('/album', CreateAlbumValidation, newAlbum);

router.delete('/:id', deleteArtistValidation, deleteArtist);
router.delete('/album/:id', deleteAlbumValidation, deleteAlbum);


module.exports = router;