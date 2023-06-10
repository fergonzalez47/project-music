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

const { ensureAuth, ensureGuest } = require("../middleware/auth.js");


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Login / Landing page
router.get("/login", ensureGuest, (req, res) => {
    res.render("login", {
        layout: "login",
    });
});

router.get("/dashboard", ensureAuth, (req, res) => {
    res.render("dashboard", {
        name: req.user.firstName
    });
});



router.get('/artist',ensureAuth, getArtists);
router.get('/album',ensureAuth, getAlbums);
router.get('/album/:id',ensureAuth, getArtistAlbums);
router.get('/artist/:id',ensureAuth, getArtistById);

router.put('/artist/:id',ensureAuth, updateArtist);
router.put('/album/:id',ensureAuth, updateAlbum);

router.post('/artist',ensureAuth, CreateArtistValidation, newArtist);
router.post('/album', ensureAuth, CreateAlbumValidation, newAlbum);

router.delete('/artist/:id', ensureAuth, deleteArtistValidation, deleteArtist);
router.delete('/album/:id', ensureAuth, deleteAlbumValidation, deleteAlbum);

module.exports = router;
