const express = require('express');
const router = express.Router();
const Playlist = require('../../models/Playlist');
const request = require('request');

const options = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/playlist/',
  qs: {
    id: '37i9dQZF1DX4Wsb4d7NKfP',
  },
  headers: {
    'X-RapidAPI-Key': 'fd75b6ebcdmsh74eb35fdb1b682dp1d5d8cjsnc2dd30198331',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
  },
};

router.get('/', async (req, res) => {
  // try {
  //   const playlists = await Playlist.findAll();
  //   res.json(playlists);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'An error occurred' });
  // }
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.json(body);
  });
});

router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, song } = req.body;
    const playlist = await Playlist.create({ title, song });
    res.status(201).json(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);

// 	console.log(body);
// });

module.exports = router;
