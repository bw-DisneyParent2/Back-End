const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secrets = require('../config/secrets');

const Parents = require('../parents/parents-model');
// ======================================================================================
router.post('/register', (req, res) => {
  if(!req.body) res.status(403).json({ code: 403, message: "Please provide the parent data to register." });

  let data = req.body;
  if(!data.email || !data.password || !data.first_name || !data.last_name || !data.number_of_kids) {
    res.status(403).json({ code: 403, message: "Missing parent details, please provide all required details and try again." });
  } else {

    const hash = bcrypt.hashSync(data.password,12);
    data.password = hash;

    Parents.add(data)
    .then(saved => {
      const token = genToken(saved);
      res.status(201).json({ created_user: saved, token: token });
      // res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      res.status(501).json(error);
    });
  }
});
// ======================================================================================      
  router.post('/login', (req, res) => {
    if(!req.body) res.status(403).json({ code: 403, message: "Please Provide email and password." });

    const { email, password } = req.body;    
  
    Parents.findBy({ email })
      .first()
      .then(log => {
        if (log && bcrypt.compareSync(password, log.password)) {
          req.session.loggedin = true;
          const token = genToken(log);
            res.status(200).json({ email: log.email, token: token });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch (err => {
        console.log(err);
        res.status(500).json({ message: 'id10t error', err });
      });
  });
//======================================================================================
router.delete('/logout', (req, res) => {
  if (req.session) {
      req.session.destroy((err) => {
          if (err) {
            console.log(err);
              res.status(400).json({ message: 'Error Logging out', err });
          } else {
              res.send('See you real soon!');
          }
      })
  } else {
      res.end();
  }
});
//=================================================================================================================================
function genToken(parent) {
  const payload = {
    parentid: parent.id,
    email: parent.email
  };

  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}
//======================================================================================
module.exports = router;


    