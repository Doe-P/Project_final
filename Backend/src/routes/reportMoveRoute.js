  
const express = require('express');
const router = express.Router();

// import function from reports
const { repMove_moveNO, repMove_year,get_moveNO,repMove_member } = require('../reports/reportMove');

// 
router.get('/reportMove/moveNO/:moveNO_ID', (req, res) => {
    const id = req.params.moveNO_ID;
    repMove_moveNO(id, (err, result) => {
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

// ============> report Move from year <=============
router.get('/reportMove/year/:year_ID', (req, res) => {
    const id = req.params.year_ID;
    repMove_year(id, (err, result) => {
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

// 
router.get('/reportMove/moveNO/get/:fund_id&:year', (req, res) => {
    const fund_id = req.params.fund_id;
    const year = req.params.year;
    get_moveNO(fund_id,year,(err, result) => {
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


// ============> report Move from year <=============
router.get('/reportMove/getmember/:id', (req, res) => {
    const id = req.params.id;
    repMove_member(id, (err, result) => {
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