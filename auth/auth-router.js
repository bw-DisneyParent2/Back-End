const router = require('express').Router();

const bcrypt = require('bcryptjs');

const Parents = require('../parents/parents-model');

router.post('/register', (req, res) => {
  // implement registration
  // user
  const data = req.body;

  data.password = bcrypt.hashSync(data.password,12);

  Parents.add(data)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(error => {
    console.log(error);
    res.status(501).json(error);
  });

});
      
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    Parents.findBy({ email })
      .first()
      .then(log => {
        if (log && bcrypt.compareSync(password, log.password)) {
          req.session.loggedin = true;
            res.status(200).json({ message: `Welcome ${log.email}!` });
        } else {
            res.status(401).json({ message: 'User Not Found' });
        }
      })
      .catch (err => {
        console.log(err);
      res.status(500).json({ message: 'id10t error', err });
    });
  });

router.delete('/logout', (req, res) => {
  if (req.session) {
      req.session.destroy((err) => {
          if (err) {
              res.status(400).json({ message: 'Error Logging out', err });
          } else {
              res.send('See you again soon!');
          }
      })
  } else {
      res.end();
  }
});

    module.exports = router;


    