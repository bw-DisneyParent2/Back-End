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

    module.exports = router;