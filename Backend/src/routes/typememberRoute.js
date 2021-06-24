// import express 
const express = require('express');

// init express router
const router = express.Router();

// import functions from model
const { getType_mb, getType_mbById, insertType_mb, updateType_mbById, deleteType_mbById, getItemType_mb } = require('../models/typememberModel');

// Get all typemembers
router.get('/api/v1/type-members', (req, res) => {
    getType_mb((err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Some error occurred while retrieving typemembers' });
        }
        res.json(result);
    });
});

// Get single typemember by id
router.get('/api/v1/type-members/:id', (req, res) => {
    const id = req.params.id;
    getType_mbById(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found typemember with id ${id}` });
            } else {
                return res.status(500).send({ msg: 'Error retrieving typemember with id' + id });
            }
        }
        res.json(result);
    });
});

// Create new typemember
router.post('/api/v1/type-members', (req, res) => {
    // Validate Request
    if (!req.body.typemember_id || !req.body.typemember_name || !req.body.money) {
        return res.status(400).send({ msg: 'Content can not be empty!' });
    } else {
        const data = req.body;
        insertType_mb(data, (err, result) => {
            if (err) {
                return res.status(500).send({ msg: 'Some error occurred while creating the typemember' });
            }
            res.json(result);
        });
    }
});

// Update typemember
router.put('/api/v1/type-members/:id', (req, res) => {
    // Validate Request
    if (!req.body.typemember_name || !req.body.money) {
        return res.status(400).send({ msg: 'Content can not be empty!' });
    }

    const id = req.params.id;
    const data = req.body;
    updateType_mbById(data, id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found typemember with id ${id}` });
            } else {
                return res.status(500).send({ msg: 'Error updating typemember with id' + id });
            }
        }
        res.json(result);
    })
});

// Delete typemember
router.delete('/api/v1/type-members/:id', (req, res) => {
    const id = req.params.id;
    deleteType_mbById(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found typemember with id ${id}` });
            } else {
                return res.status(500).send({ msg: 'Could not delete typemember with id' + id });
            }
        }
        res.json(result);
    });
});

// Get items typemember
router.get('/api/v1/getItem/type-members', (req, res) => {
    getItemType_mb((err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Some error occurred while retrieving item typemember' });
        }
        res.json(result);
    });
});

module.exports = router;