const router = require("express").Router();
const Requests = require("./requests-model");
const authorized = require("../auth/authenticate-middleware");

router.get("/", authorized, (req, res) => {
    const { parentid } = req.decodedJwt;

    Requests.find(parentid)
        .then(requests => {
            res.status(200).json(requests);
        })
        .catch(err => res.status(500).json({ code: 500, message: "Cannot retrieve requests", err }));

});

router.get("/parent", authorized, (req, res) => {
    const { parentid } = req.decodedJwt;

    Requests.findByParentId(parentid)
        .then(requests => {
            res.status(200).json(requests);
        })
        .catch(err => res.status(500).json({ code: 500, message: "Cannot retrieve requests", err }));
});

router.get("/:id", authorized, (req, res) => {
    const { id } = req.params;

    Requests.findById(id)
        .then(request => {
            res.status(200).json(request);
        })
        .catch(err => res.status(500).json({ code: 500, message: `Cannot retrieve request with id: ${id}`, err}));
});

router.post("/new", authorized, async (req, res) => {
    const { parentid } = req.decodedJwt;
    const data = req.body;

    if(!data || !data.ride || !data.connect_time) {
        return res.status(403).json({ code: 403, message: "Missing required data for request." });
    }

    const request = {
        ...data,
        requester_id: parentid
    }

    let rideRequestExist = false;
    await Requests.findBy(request)
        .then(request => {
            if(request) rideRequestExist = true;
        });    

    if (rideRequestExist) return res.status(403).json({ code: 403, message: `You have already requested this request`, request})
    
    Requests.add(request)
        .then(newRequest => {
            res.status(201).json(newRequest);
        })
        .catch(err => res.status(500).json({ code: 500, message: "Could not create new request", err }));
    
});

router.patch("/:id", authorized, async (req, res) => {
    const { id } = req.params;
    const { parentid } = req.decodedJwt;
    const data = req.body;

    if (!data) return res.status(403).json("No data to update found");

    const found = await Requests.findById(id);
    const requestConflict = await Requests.findBy({...data, requester_id: parentid });

    if(!found) return res.status(404).json({ code: 404, message: `Request with id: ${id} not found.` });
    if(requestConflict) return res.status(403).json({ code: 403, message: "Your request update is either the same or creates a duplicate of another request." });

    Requests.update(id, data)
        .then(() => {
            res.status(200).json({code: 200, message: "Request updated successfully"});
        })
        .catch(err => res.status(500).json({ code: 500, message: "There was an error updating the request", err }));
});

router.delete("/:id", authorized, async (req, res) => {
    const { id } = req.params;

    const found = await Requests.findById(id);

    if(!found) return res.status(404).json({ code: 404, message: `Request with id: ${id} not found.` });

    Requests.remove(id)
        .then(() => {
            res.status(200).json({ code: 200, message: `Request with id ${id} has been removed` });
        })
        .catch(err => res.status(500).json({ code: 500, message: "There was an error removing request", err }));
});

module.exports = router;