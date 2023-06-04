const router = require('express').Router();
const { CreateArtistValidation,
    deleteArtistValidation,
    CreateAlbumValidation,
    deleteAlbumValidation
} = require("../validation.js");

const {
    getArtists,
    getArtistById,
    newArtist,
    newAlbum,
    getArtistAlbums,
    getAlbums,
    updateArtist,
    updateAlbum,
    deleteArtist,
    deleteAlbum
} = require('../controllers/controllers.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Login / Landing page
router.get("/login", (req, res) => {
    res.render("login", {
        layout: "login",
    });
});

router.get("/dashboard", (req, res) => {
    res.render("dashboard");
});



router.get('/artist', getArtists);
router.get('/album', getAlbums);
router.get('/album/:id', getArtistAlbums);
router.get('/artist/:id', getArtistById);

router.put('/artist/:id', updateArtist);
router.put('/album/:id', updateAlbum);

router.post('/artist', CreateArtistValidation, newArtist);
router.post('/album', CreateAlbumValidation, newAlbum);

router.delete('/artist/:id', deleteArtistValidation, deleteArtist);
router.delete('/album/:id', deleteAlbumValidation, deleteAlbum);

module.exports = router;
