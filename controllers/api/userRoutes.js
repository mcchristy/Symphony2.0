const router = require('express').Router();
const { User } = require('../../models');

// router.get('/', async (req, res) => {

//     try{
//         const userData = await User.findAll();
//         res.json(userData);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ message: 'An error occured'});
//     }
//   });

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
  console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { e_mail: req.body.e_mail } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/seed', (req, res) => {
  User.bulkCreate([
    {
      e_mail: 'tryhard@gmail.com',
      Playlist_Name: 'Rap Playlist',
    },
    {
      e_mail: 'tryhard23@gmail.com',
      Playlist_Name: 'Pop Playlist',
    },
    {
      e_mail: 'tryhard12@gmail.com',
      Playlist_Name: 'Rock Playlist',
    },
    {
      e_mail: 'tryhard243@gmail.com',
      Playlist_Name: 'Creep Playlist',
    },
    {
      e_mail: 'tryhard423@gmail.com',
      Playlist_Name: 'Lol Playlist',
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
