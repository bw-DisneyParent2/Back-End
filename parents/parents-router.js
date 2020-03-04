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

router.put('/:id', authorized, async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const changed = await Parents.findById(id);

    if (changed) {
        Parents.update(data, id)
            .then(updatedUser => {
                res.status(200).json({ message: 'Updated the user!', data });
            });
    } else {
        console.log(id);
        res.status(404).json({ message: 'Could not find user.' })
    }
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to update user, try again later.', err })
  }
});

module.exports = router;