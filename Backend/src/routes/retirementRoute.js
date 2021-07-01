// import express
const express = require('express');

// init express router
const router = express.Router();

// import functions from model
const { getAllRetire, getRetireById, insertRetire, updateRetireById, deleteRetireById, getMemberByStatus } = require('../models/retirementModel');

// get all retirements
router.get('/api/v1/retirements', (req, res) => {
    getAllRetire((err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Error while retrieving member retirement' });
        }
        res.json(result);
    })
});

// get single retirement by id
router.get('/api/v1/retirements/:id', (req, res) => {

});

// get data from table member where status = member and age > 35
router.get('/api/v1/membersWhere-Status-Age', (req, res) => {
    getMemberByStatus((err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Error while retrieving member by status and age' });
        }
        res.json(result);
    });
});

// create new retirement
router.post('/api/v1/retirements', (req, res) => {
    // Validate request
    if (!req.body.member_id || !req.body.retire_NO || !req.body.No_Ask) {
        return res.status(400).send({ msg: 'Content can not be empty!!' });
    } else {
        const data = req.body;
        insertRetire(data, (err, result) => {
            if (err) {
                return res.status(500).send({ msg: 'Some error occurred while create retiermemt' });
            }
            res.json(result);
        });
    }
});

// update retirement
router.put('/api/v1/retirements/:id', (req, res) => {
    // Validate request
    if (!req.body.No_Ask || !req.body.retire_NO) {
        return res.status(400).send({ msg: 'Content cant not be empty!' });
    }
    const id = req.params.id;
    console.log(id);
    const data = req.body;
    updateRetireById(data, id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found retirement with ID:${id}` });
            } else {
                return res.status(500).send({ msg: 'Error updating retirement with ID:' + id });
            }
        }
        res.json(result);
    })
});

// delete retirement
router.delete('/api/v1/retirements/:id', (req, res) => {
    const id = req.params.id;
    deleteRetireById(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found member retirement with ID${id}` });
            } else {
                return res.status(500).send({ msg: `Could not delete member retirement with ID ${id}` });
            }
        }
        res.json(result);
    });
});

module.exports = router;