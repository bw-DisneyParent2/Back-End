const router = require("express").Router();
const Parents = require("./parents-model");
const authorized = require("../auth/authenticate-middleware");

router.get("/", authorized, (req, res) => {
  Parents.find()
    .then(parents => {
      res.json(parents);
    })
    .catch(err => res.send({ message: "cannot retrieve parents", err }));
});

router.get("/:id", authorized, (req, res) => {
  const { id } = req.params;

  Parents.findById(id)
    .then(parent => {
      if(!parent) res.status(404).json({ code: 404, message: `Parent with id ${id} not found`})
      else res.json(parent);
    })
    .catch(err => res.send({ message: "cannot retrieve that person", err }));
});

router.patch("/:id", authorized, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if(Object.keys(data).length === 0) 
    return res.status(403).json({ code: 403, message: "No data found in request body, please provide at least one value to change."});

  try {
    const parent = await Parents.findById(id);

    if (parent) {
      Parents.update(data, id).then(() => {
        res.status(200).json({ message: "Updated the user!" });
      })
      .catch(err => {
        res.status(400).json({ code: 400, message: "Error updating parent, check the data and try again."});
      });
    } else {
      console.log(id);
      res.status(404).json({ message: "Could not find parent." });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to update parent, try again later.", err });
  }
});

router.delete("/:id", authorized, async (req, res) => {
  const { id } = req.params;

  try {
    await Parents.remove(id);
    res.status(200).json({ message: `Successfully removed the parent  ${id}.` });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Could not remove this parent, please try again later.",
        err
      });
  }
});

module.exports = router;
