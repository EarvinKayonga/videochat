const express = require('express'),
      router  = express.Router(),
      storage = require('node-persist');

storage.init({
    dir: 'db/data/userdb',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false,
    continuous: true,
    interval: false, // milliseconds
    ttl: 500
})
.then(
  (db) => {
    console.log("Database is Up " , db);
  },
  (error) => {
    console.error(error);
  }
);

router.get('/all', function(req, res) {
    let users = storage.values();
    return res.status(200).json(users);
});

router.get('/:username', function(req, res) {
  let username = req.params.username;
  return storage.getItem(username)
  .then((user) => {
    return (user) ? (res.status(200).json(user)): (res.status(400).json({error : 'Not Found'}));
  });
});

router.post('/:username', function(req, res) {
  let username = req.params.username,
      body = req.body;
  return storage.setItem(username, body)
  .then(
    (user) => {
      return (user) ? (res.status(200).json(user)): (res.status(400).json({error : 'user not found'}));
    },
    (error) => {
      return (res.status(400).json(error));
    }
  );
});

module.exports = router;
