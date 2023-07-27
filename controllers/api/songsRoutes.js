const express = require('express');
const router = express.Router();
const Song = require('../../models/Song');
const request = require('request');

const options = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/tracks/',
  qs: {
    ids: '4WNcduiCmDNfmTEz7JvmLv',
  },
  headers: {
    'X-RapidAPI-Key': 'fd75b6ebcdmsh74eb35fdb1b682dp1d5d8cjsnc2dd30198331',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
  },
};

// Get all songs
router.get('/', async (req, res) => {
  // try {
  //   const songs = await Song.findAll();
  //   res.json(songs);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'An error occurred' });
  // }
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
});

// Get a single song by ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


module.exports = router;
