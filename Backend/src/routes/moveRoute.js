const express = require('express');
const router = express.Router();

// import function from model
const { insert, update, getAll, getById } = require('../models/moveModel');

// Create move
router.post('/api/v1/moves', (req, res) => {
    //const {name, surname}  = req.body
    // let data = [{name,surname}]
    // console.log(data);
    // console.log(surname);
    // return res.status(200).send({msg: data})
    // Validate request
    if (!req.body.move_id || !req.body.move_NO) {
        return res.status(400).send({ msg: 'Content can not be empty!' })
    } else {
        const data = req.body;
        insert(data, (err, result) => {
            if (err) {
                return res.status(500).send({ msg: 'Some error occurred while create !!!' });
            }
            res.json(result);
        });
    }
});

// Update move 
router.put('/api/v1/moves/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    update(data, id, (err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Error' })
        }
        res.json(result);
    });
});

// Get all move
router.get('/api/v1/moves', (req, res) => {
    getAll((err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Some error occurred while retrieving move and movedetail' });
        }
        res.json(result);
    });
});

// Get move by id
router.get('/api/v1/moves/:id', (req, res) => {
    const id = req.params.id;
    getById(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found move and detail with id ${id}` });
            } else {
                return res.status(500).send({ msg: 'Error retrieving move and detail with id' + id });
            }
        }
        res.json(result);
    });
});

module.exports = router;