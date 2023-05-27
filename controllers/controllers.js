const mongoose = require('mongoose');
const Artist = require('../models/artist.js');
const Album = require('../models/albums.js');

const createError = require("http-errors");

const { validationResult } = require('express-validator');



const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();

        res.status(200).json({ artists });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "error getting the artists..." });
    }
};


const getArtistById = async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);

        // if (!artist) {
        //     return res.status(404).json({ message: 'Artist not found' });
        // };

        if (!artist) {
            throw createError(404, "Artist not found");
        };

        res.json(artist);
    } catch (error) {
        console.log(error);
        
        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid artist ID."));
            return
        }
        next(error);
    }
};

//Method to create a new artist

const newArtist = async (req, res, next) => {

    // if (!stageName || !firstName || !lastName || !age || !genre || !birthday) {
    //     // Return an error if any of the required fields is missing
    //     return res.status(400).json({ message: 'All fields are required' });
    // }

    //------------------- Validation ------------------------- //
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    //------------------- Validation ------------------------- //
    const { stageName, firstName, lastName, age, genre, birthday } = req.body;
    try {
        let artist = {
            stageName: stageName,
            firstName: firstName,
            lastName: lastName,
            age: age,
            genre: genre,
            birthday: birthday
        };
        let artistModel = new Artist(artist);
        await artistModel.save();
        //Return the new artist ID in the response body
        res.status(201).json({ id: artistModel._id });

        console.log("*** Artist Saved ***");
    } catch (error) {
        console.error(error.name, error.message );
        // res.status(500).send('Error saving the new Artist');
        if (error.name === "ValidationError") {
            next(createError(422, error.message));
            return;
        };
        next(error);
    }
};



//****************************************************** **************** ******** */
//***************************** *ALBUMS ******************************* **/
//************************************ ******************* *********  */

//Get all albums in collection

const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find();

        res.json({ albums });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "error getting the albums..." });
    }
};






//Method to create a new album
const newAlbum = async (req, res, next) => {


    // if (!title || !released || !artist || !songs) {
    //     // Return an error if any of the required fields is missing
    //     return res.status(400).json({ message: 'All fields are required' });
    // };
    //------------------- Validation ------------------------- //
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    //------------------- Validation ------------------------- //
    const { title, released, artist, songs } = req.body;
    try {
        const artistId = artist; // Aquí asumimos que artist es el ID del artista

        // Verificar si el artista existe
        const existingArtist = await Artist.findById(artistId);
        if (!existingArtist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        let album = {
            title: title,
            released: released,
            artist: artistId,
            artistName: existingArtist.stageName,
            songs: songs
        }

        let albumModel = new Album(album);
        await albumModel.save();
        //Return the new album ID in the response body
        res.status(201).json({ id: albumModel._id, name: albumModel.title, artistName: albumModel.artistName });

        console.log("*** Album Saved ***");

    } catch (error) {
        console.error(error.message);
        // res.status(500).send('Error saving the new Album');
        if (error.name === "ValidationError") {
            next(createError(422, error.message));
            return;
        };
        next(error);
    }
};

const getArtistAlbums = async (req, res, next) => {
    const artistId = req.params.id;

    try {
        const artist = await Artist.findById(artistId);

        // if (!artist) {
        //     return res.status(404).json({ message: 'Artist not found' });
        // }
        if (!artist) {
            throw createError(404, "Artist not found");
        };

        const albums = await Album.find({ artist: artistId });
        res.status(200).json({ albums });
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Server Error. We are really sorry!' });
        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid artist ID."));
            return
        }
        next(error);
    }
};

/************************/
/* FUNCTIONS TO UPDATE  */
/************************/


const updateArtist = async (req, res, next) => {
    try {
        const artistToUpdate = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(artistToUpdate)) {
            console.log(artistToUpdate);
            return res.status(400).send({ message: "Invalid artist ID" });
        };

        const { stageName, firstName, lastName, age, genre, birthday } = req.body;

        const update = {
            stageName: stageName,
            firstName: firstName,
            lastName: lastName,
            age: age,
            genre: genre,
            birthday: birthday
        }

        const updatedArtist = await Artist.findByIdAndUpdate(artistToUpdate, update, { new: true });
        
        if (!updatedArtist) {
            throw createError(404, "Artist does not exist");
        };

        res.status(200).json({ message: "Artist Updated...", updatedArtist });
        console.log("Artist Updated...");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Eror updating the Artist...");

        next(error);
    }
};




//Update ALbum




const updateAlbum = async (req, res, next) => {
    try {
        const albumToUpdate = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(albumToUpdate)) {
            console.log(albumToUpdate);
            return res.status(400).send("Invalid Album ID");
        };

        const { title, released, artist, songs } = req.body;

        const update = {
            title: title,
            released: released,
            artist: artist,
            songs: songs
        }

        const updatedAlbum = await Album.findByIdAndUpdate(albumToUpdate, update, { new: true });

        res.status(200).json({ message: "Album Updated...", updatedAlbum });
        console.log("Album Updated...");
    } catch (error) {
        console.error( error, error.message);
        res.status(500).send("Error updating the Album...");
    }
}



/************************/
/* FUNCTIONS TO DELETE  */
/************************/


const deleteArtist = async (req, res, next) => {
    //------------------- Validation ------------------------- //
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    //------------------- Validation ------------------------- //

    const artistToDelete = req.params.id;
    try {
        const deletedArtist = await Artist.findByIdAndDelete(artistToDelete);

        // if (!deletedArtist) {
        //     return res.status(404).json({ message: "Artist not found" });
        // }
        if (!deletedArtist) {
            throw createError(404, "Artist not found");
        };
        

        res.status(200).json({ message: "Artist deleted" });
    } catch (error) {
        console.error(error.message);
        // res.status(500).send('Error deleting the Artist!');

        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid artist ID."));
            return
        }
        next(error);
    }
}





const deleteAlbum = async (req, res, next) => {

    //------------------- Validation ------------------------- //
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    //------------------- Validation ------------------------- //

    const albumToDelete = req.params.id;
    try {
        const deletedAlbum = await Album.findByIdAndDelete(albumToDelete);

        // if (!deletedAlbum) {
        //     return res.status(404).json({ message: "Album not found" });
        // }
        if (!deletedAlbum) {
            throw createError(404, "Album not found");
        };



        res.status(200).json({ message: "Album deleted" });
    } catch (error) {
        console.error(error.message);
        // res.status(500).send('Error deleting the Album!');

        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid artist ID."));
            return
        }
        next(error);
    }
}

module.exports = {
    getArtists, getArtistById,
    newArtist, newAlbum,
    getArtistAlbums, getAlbums,
    updateArtist, updateAlbum,
    deleteArtist, deleteAlbum
};