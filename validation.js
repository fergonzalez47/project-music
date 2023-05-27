const { check } = require("express-validator");
//Artist
exports.CreateArtistValidation = [
    check('stageName', 'stage name is required').not().isEmpty(),
    check('firstName', 'Name is required').not().isEmpty(),
    check('lastName', 'last name is required').not().isEmpty(),
    check('age', 'Please, include the age in a proper way (Number)').isInt(),
    check('genre', 'Music genre is required').not().isEmpty(),
    check('birthday', 'Birthday must be a valid date').isDate()
];

exports.deleteArtistValidation = [
    check('id', 'Artist ID is required for delete').not().isEmpty(),
    check('id', 'Invalid Artist ID').isMongoId()
];



//Album

exports.CreateAlbumValidation = [
    check('title', 'title for the album is required').not().isEmpty(),
    check('released', 'Release date is required').isDate(),
    check('artist', 'Artist ID is required').not().isEmpty(),
    check('songs', 'Amount of songs is required').isInt()
];

exports.deleteAlbumValidation = [
    check('id', 'Album ID is required for delete').not().isEmpty(),
    check('id', 'Invalid Album ID').isMongoId()
];