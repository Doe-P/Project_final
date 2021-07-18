const express = require('express');
const router = express.Router();

// import function from model
const { insert, update, getCertificateByID, CountFemale, CountAll, getCerti_admin, getCerti_client, getCerti_detail_admin, getCerti_detail_client, getMember_client, getCerti_maxID } = require('../models/certificModel');

// Create new certificate and certificate_detail
router.post('/api/v1/new-certificate', (req, res) => {
    const data = req.body.data;
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
                return res.status(404).send({ msg: `Not found certificate` });
            } else {
                return res.status(500).send({ msg: 'Error updating certificate' });
            }
        }
        res.json(result);
    });
});

// Get member where fund_name for insert (client)
router.get('/api/v1/getMember/:id', (req, res) => {
    const id = req.params.id;
    getMember_client(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found` });
            } else {
                return res.status(500).send({ msg: 'Error while retrieving member' });
            }
        }
        res.json(result);
    });
});

// Get certificate where fund_name for (client)
router.get('/api/v1/geCertificate/client/:id', (req, res) => {
    const id = req.params.id;
    getCerti_client(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found` });
            } else {
                return res.status(500).send({ msg: 'Error while retrieving certificate' });
            }
        }
        res.json(result);
    });
});

// Get certificate  for admin
router.get('/api/v1/geCertificate/admin', (req, res) => {
    getCerti_admin((err, result) => {
        if (err) {
            return res.status(500).send({ msg: `Some error while retrieving certificate !` });
        }
        res.json(result);
    });
});

// Get certificate by id
router.get('/api/v1/getCertificate-byID/:id', (req, res) => {
    const id = req.params.id;
    getCertificateByID(id,(err, result) => {
        if (err) {
            return res.status(500).send({ msg: `Some error while retrieving certificate by ${id} !` });
        }
        res.json(result[0]);
    });
});

// Get data certificate_detail for client
router.get('/api/v1/getCertificate_detail/client/:id', (req, res) => {
    const id = req.params.id;
    getCerti_detail_client(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found` });
            } else {
                return res.status(500).send({ msg: 'Error while retrieving data' });
            }
        }
        res.json(result);
    });
});

// Get data certificate_detail for admin
router.get('/api/v1/getCertificate_detail/admin/:id', (req, res) => {
    const id = req.params.id;
    getCerti_detail_admin(id,(err, result) => {
        if (err) {
            return res.status(500).send({ msg: `Some error while retrieving data !` });
        }
        res.json(result);
    });
});
// count all
router.get('/api/v1/CountAll/Member/Certificate',(req,res)=>{
    CountAll((err,result)=>{
        if(err){
            return res.status(500).send({ msg: `Count all member certificate error:`+err }); 
        }
        res.json(result[0])
    })
})
// count female
router.get('/api/v1/CountFemale/Member/Certificate',(req,res)=>{
    CountFemale((err,result)=>{
        if(err){
            return res.status(500).send({ msg: `Count female member certificate error:`+err }); 
        }
        res.json(result[0])
    })
})
// Get certificate maxID
router.get('/api/v1/getCerti/MaxID', (req, res) => {
    getCerti_maxID((err, result) => {
        if (err) {
            return res.status(500).send({ msg: `Some error while retrieving MaxID` });
        }
        res.json(result[0]);
    });
});

module.exports = router;