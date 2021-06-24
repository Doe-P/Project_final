// import express
const express = require('express');

// init express router
const router = express.Router();

// import functions from model
const { getAllRetire, getRetireById, insertRetire, updateRetireById, deleteRetireById, getMemberByStatus } = require('../models/retirementModel');

// get all retirements
router.get('/api/v1/retirements', (req, res) => {

});

// get single retirement by id
router.get('/api/v1/retirements/:id', (req, res) => {

});

// get data from table member where status = member and age > 35
router.get('/api/v1/membersWhere-Status-Age', (req, res) => {
    getMemberByStatus((err, result) => {
        if (err) {
            return res.status(500).send({msg:'Error while retrieving member by status and age'});
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
        console.log(data);
        insertRetire(data, (err, result) => {
            if (err) {
                if (err.kind === 'the same') {
                    return res.status(400).send({ msg: 'member_id the same member_id from request' });
                } else {
                    return res.status(500).send({ msg: 'Some error occurred while create retiermemt' });
                }
            }
            res.json(result);
        });
    }
});

// update retirement
router.put('/api/v1/retirements/:id', (req, res) => {

});

// delete retirement
router.delete('/api/v1/retirements/:id', (req, res) => {

})

module.exports = router;