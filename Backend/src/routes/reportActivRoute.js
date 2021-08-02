const express = require('express');
const router = express.Router();

// import funciton from reports
const { repActiv_title, repActiv_year } = require('../reports/reportActiv');

// ============> report activity from title <================
router.get('/reportActivity/title/:title_ID', (req, res) => {
    const id = req.params.title_ID;
    repActiv_title(id, (err, result) => {
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

// ===========> report activity from year <=============
router.get('/reportActivity/year/:year_ID', (req, res) => {
    const id = req.params.year_ID;
    repActiv_year(id, (err, result) => {
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