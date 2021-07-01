const express = require('express');
const router = express.Router();

// import function from model
const { insert, update } = require('../models/certificModel');

// Create new certificate and certificate_detail
router.post('/api/v1/new-certificate', (req, res) => {
    const data = req.body;
    insert(data, (err, result) => {
        if (err) {
            return res.status(500).send({ msg: `Some error occurred while create !` });
        }
        res.json(result);
    });
});

// Update certificate by id
router.put('/api/v1/certificate/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    update(data, id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({msg:`Not found certificate`});
            } else {
                return res.status(500).send({msg: 'Error updating certificate'});
            }
        }
        res.json(result);
    });
});

module.exports = router;