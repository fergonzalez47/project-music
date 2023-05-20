const mongoose = require('mongoose');
const Artist = require('../models/artist.js');
const Album = require('../models/albums.js');



const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();

        res.status(200).json({ artists });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "error getting the artists..." });
    }
};


const getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            return res.status(404).json({ message: 'Artist not found'});
        };
        
        res.json(artist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error. We are really sorry!'});
    }
};

//Method to create a new artist

const newArtist = async (req, res) => {
    const { stageName, firstName, lastName, age, genre, birthday } = req.body;

    if (!stageName || !firstName || !lastName || !age || !genre || !birthday) {
        // Return an error if any of the required fields is missing
        return res.status(400).json({ message: 'All fields are required' });
    }
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
        console.error(error.message);
        res.status(500).send('Error saving the new Artist');
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
const newAlbum = async (req, res) => {
    const { title, released, artist, songs } = req.body;

    if (!title || !released || !artist || !songs) {
        // Return an error if any of the required fields is missing
        return res.status(400).json({ message: 'All fields are required' });
    };
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
            songs: songs
        }

        let albumModel = new Album(album);
        await albumModel.save();
        //Return the new album ID in the response body
        res.status(201).json({ id: albumModel._id, name: albumModel.title });

        console.log("*** Album Saved ***");

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error saving the new Album');
    }
};

const getArtistAlbums = async (req, res) => {
    const artistId = req.params.id;

    try {
        const artist = await Artist.findById(artistId);

        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        const albums = await Album.find({ artist: artistId });
        res.status(200).json({ albums });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error. We are really sorry!' });
    }
};



module.exports = { getArtists, getArtistById, newArtist, newAlbum, getArtistAlbums, getAlbums };