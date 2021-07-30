  
const express = require('express');
const router = express.Router();

// import function from reports
const { repRetire_Year, repRetireBetween_Year } = require('../reports/reportRetireMen');

// =====================> report Retirement where year <========================
router.get('/reportRetireMen/year/fundID/:yearID/:id', (req, res) => {
    const id = req.params.id;
    const year = req.params.yearID;
    console.log(id);
    console.log(year);
    repRetire_Year(year, id, (err, result) => {
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

// =====================> report qty all member and female retiremen <=====================
router.get('/reportRetireMen/between/Date/:start_d/:end_d', (req, res) => {
    const date_start = req.params.start_d;
    const date_end = req.params.end_d;
    console.log(date_start);
    console.log(date_end);
    repRetireBetween_Year(date_start, date_end, (err, result) => {
        if (err) {
            return res.status(500).send({msg: 'Some error while retrieving data'});
        }
        res.json(result);
    });
});

module.exports = router;