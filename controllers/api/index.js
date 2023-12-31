const router = require('express').Router();
const userRoutes = require('./userRoutes');
const playlistsRoutes = require('./playlistsRoutes');
const songsRoutes = require('./songsRoutes');

router.use('/user', userRoutes);
router.use('/playlists', playlistsRoutes);
router.use('/songs', songsRoutes);

module.exports = router;
