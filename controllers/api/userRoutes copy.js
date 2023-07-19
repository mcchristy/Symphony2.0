const router = require('express').Router();
const User = require('../../models/User');


router.get('/', async (req, res) => {
    // Get all user from the user table
    try{
        const userData = await User.findAll();
        res.json(userData);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'An error occured'});
    }
  });


// Create a User
router.post('/', async (req, res) => {
    try{
        const newUser = await User.create({
            e_mail: req.body.e_mail,
            Playlist_Name: req.body.Playlist_Name
        })
        res.json(newUser);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
      };
  });

// CREATE multiple users
router.post('/seed', (req, res) => {
    User.bulkCreate([
        {
            e_mail: 'tryhard@gmail.com',
            Playlist_Name: 'Rap Playlist'
        },
        {
            e_mail: 'tryhard23@gmail.com',
            Playlist_Name: 'Pop Playlist'
        },
        {
            e_mail: 'tryhard12@gmail.com',
            Playlist_Name: 'Rock Playlist'
        },
        {
            e_mail: 'tryhard243@gmail.com',
            Playlist_Name: 'Creep Playlist'
        },
        {
            e_mail: 'tryhard423@gmail.com',
            Playlist_Name: 'Lol Playlist'
        },
    ])
    .then(() => {
        res.send('Database seeded!');
      })
      .catch((err) => {
        res.json(err);
      });
});

module.exports = router;