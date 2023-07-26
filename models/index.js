const Playlist = require('./Playlist');
const Song = require('./Song');
const User = require('./User');

//Song belongs to Playlists
Song.belongsTo(Playlist, {
  foreignKey: 'playlist_id',
});

//Playlist has many songs
Playlist.hasMany(Song, {
  foreignKey: 'playlist_id',
});

//Playlist belongs to User
Playlist.belongsTo(User, {
  foreignKey: 'user_id',
});

//User has many playlist
User.hasMany(Playlist, {
  foreignKey: 'user_id',
});

module.exports = { Playlist, User, Song };
