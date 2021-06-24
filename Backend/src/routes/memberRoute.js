const express = require('express');
const router = express.Router();

// import function from medel
const { insertMember, getMember, getMemberById, updateMemberById, getMaxMemberId, deleteMemberById } = require('../models/memberModel');

// Create new member
router.post('/api/v1/members', (req, res) => {
    // Validate request
    if (!req.body.member_id || !req.body.member_name || !req.body.surname ) {
        return res.status(400).send({ msg: 'Content can not be emtyp!' })
    } else {
        const data = req.body
        console.log(data);
        insertMember(data, (err, result) => {
            if (err) {
                return res.status(500).send({ msg: 'Some error occured while create new member' });
            }
            res.json(result);
        });
    }
});

// Update member
router.put('/api/v1/members/:id', (req, res) => {
    // Validate request
    if (!req.body.member_name || !req.body.surname) {
        return res.status(400).send({ msg: 'Content can not be emtyp!' });
    }

    const id = req.params.id;
    const data = req.body;
    updateMemberById(data, id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found member with ID:${id}` })
            } else {
                return res.status(500).send({ msg: 'Error updating member with ID:' + id })
            }
        }
        res.json(result);
    });
})

// Delete single member
router.delete('/api/v1/members/:id', (req, res) => {
    const id = req.params.id;
    deleteMemberById(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({msg:`Not found member with ID:${id}`});
            } else {
                return res.status(500).send({msg: 'Could not delete member with ID:' + id});
            }
        }
        res.json(result);
    });
});

// Get all member
router.get('/api/v1/members', (req, res) => {
    getMember((err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Some error occurred while retrieving member' });
        }
        res.json(result);
    });
});

// Get single member by id
router.get('/api/v1/members/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    getMemberById(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found member with id ${id}` });
            } else {
                return res.status(500).send({ msg: 'Error while retrieving member with id:' + id });
            }
        }
        res.json(result);
    });
});

router.get('/api/v1/members-MaxID', (req, res) => {
    getMaxMemberId((err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Some error occurred while retrieving Max member ID!' })
        }
        res.json(result);
    });
});

module.exports = router