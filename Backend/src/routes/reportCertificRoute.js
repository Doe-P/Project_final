const express = require('express');
const router = express.Router();

// import function from reports
const { repCertific_listMember, repCertific_Year,get_CertificateNO } = require('../reports/reportCertific');

// ==============> report member certificate <=================
router.get('/reportCertificate/member/:certi_ID', (req, res) => {
    const id = req.params.certi_ID;
    repCertific_listMember(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: 'Not found' });
            } else {
                return res.status(500).send({ msg: 'error retrieving data !!' });
            }
        }
        res.json(result);
    });
});

// ===============> report certificate from year <===============
router.get('/reportCertificate/year/:year_ID', (req, res) => {
    const year = req.params.year_ID;
    console.log(year);
    repCertific_Year(year, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: 'Not found' });
            } else {
                return res.status(500).send({ msg: 'error retrieving data !!' });
            }
        }
        res.json(result);
    });
});



// 
router.get('/reportCertificate/CertiNO/get/:year', (req, res) => {
    const year = req.params.year;
    get_CertificateNO(year,(err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: 'Not found' });
            } else {
                return res.status(500).send({ msg: 'Error retrieving data !!' });
            }
        }
        res.json(result);
    });
});



module.exports = router;