const express = require('express');
const router = express.Router();
const Playlist = require('../../models/Playlist');

// Get all playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.findAll();
    res.json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Get a single playlist by ID
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

// Create a new playlist
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

module.exports = router;