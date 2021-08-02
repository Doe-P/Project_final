const express = require('express');
const router = express.Router();

// import function from reports
const { repReceive_year, repReceive_all, repBill_fundID } = require('../reports/reportReceiveMN');

// ===============> report receive money where year <===================
router.get('/reportReceive_money/year/:year_ID', (req, res) => {
    const id = req.params.year_ID;
    repReceive_year(id, (err, result) => {
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

// ==============> report receive money <================
router.get('/reportReceive_money/all', (req, res) => {
    repReceive_all((err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Some error while occurred retrieving data' });
        }
        res.json(result);
    });
});

// =============> report invoice <==================
router.get('/reportInvoice_money/fundID/:fund_ID', (req, res) => {
    const id = req.params.fund_ID;
    repBill_fundID(id, (err, result) => {
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

module.exports = router;