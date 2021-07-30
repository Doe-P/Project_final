const express = require('express');
const router = express.Router();

// import function from model
const { insertMn, getReceiveMoney_client, getQuarterlyWhereYear, getReceiveMoney_admin, getReceiveMoney_MaxID, getMember, getReceiveDetail_client, getReceiveDetail_admin } = require('../models/recive_moneyModel');

// insert receive money and detail
router.post('/api/v1/newReceive-Money', (req, res) => {
    const data = req.body.data;
    insertMn(data, (err, result) => {
        if (err) {
            return res.status(500).send({ msg: `Some error occurred while create !` });
        }
        res.json(result);
    });
});

// get data receive money for client
router.get('/api/v1/getReceiveMoney/client/:id', (req, res) => {
    const id = req.params.id;
    getReceiveMoney_client(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found` });
            } else {
                return res.status(500).send({ msg: 'Error while retrieving Receive money' });
            }
        }
        res.json(result);
    });
});

// get data receive money for admin
router.get('/api/v1/getReceiveMoney/admin', (req, res) => {
    getReceiveMoney_admin((err, result) => {
        if (err) {
            return res.status(500).send({ msg: `Some error while retrieving data !` });
        }
        res.json(result);
    });
});

// get data Receive detail for client 
router.get('/api/v1/getReceiveDetail/client/:id', (req, res) => {
    const id = req.params.id;
    getReceiveDetail_client(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found` });
            } else {
                return res.status(500).send({ msg: 'Error while retrieving Receive detail' });
            }
        }
        res.json(result);
    });
});

// get data Receive detail for admin
router.get('/api/v1/getReceiveDetail/:id', (req, res) => {
    const id = req.params.id;
    getReceiveDetail_admin(id,(err, result) => {
        if (err) {
            return res.status(500).send({ msg: `Some error while retrieving data !` });
        }
        res.json(result);
    });
});

// get Max receive money ID
router.get('/api/v1/getReceiveMoney/MaxID', (req, res) => {
    getReceiveMoney_MaxID((err, result) => {
        if (err) {
            return res.status(500).send({ msg: `Some error while retrieving MaxID` });
        }
        res.json(result[0]);
    });
});

// get data member for insert receive money
router.get('/api/v1/getMembers/ReceiveMoney/:id', (req, res) => {
    const id = req.params.id;
    getMember(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: 'Not found' });
            } else {
                return res.status(500).send({ msg: 'error retrieving data!!' });
            }
        }
        res.json(result);
    });
});

// ==============> get quarterly where year and fund_id <==================
router.get('/api/v1/getQuarterly/fundID/:id&:data', (req, res) => {
    const id = req.params.id;
    const data = req.params.data;
    getQuarterlyWhereYear(id, data, (err, result) => {
        if (err) {
                return res.status(500).send({ msg: 'error retrieving Count data !!' });
        }
        res.json(result);
    });
});

module.exports = router;