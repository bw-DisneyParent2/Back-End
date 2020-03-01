const router = require('express').Router();

const Parents = require('./parents-model');

const authorized = require('../auth/authenticate-middleware');

router.get('/', authorized, ( req,res )=> {
  Parents.find()
    .then(parents => {
      res.json(parents);
    })
    .catch(err => res.send({ message:
        "cannot retrieve parents", err }
  ));
});

router.get('/:id', authorized, (req,res) => {
  const { id } = req.params;
console.log(id);
  Parents.findById(id)
    .then(parents => {
      res.json(parents);
    })
    .catch(err => res.send({ message:
    "cannot retrieve that person", err }
  ));
});

module.exports = router;