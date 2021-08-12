
const express = require('express');
const router = express.Router();

// import function from reports
const { repFoundation, repMemberStatis_start_last } = require('../reports/reportStatisticMember');

// ===========> report foundations <===============
router.get('/reportStatistics/Member', (req, res) => {
    repFoundation((err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Some error occurred while retrieving data!' });
        }
        res.json(result);
    });
});

// ==================> report member statistic 6ເດືອນທ້າຍປີຕົ້ນປີ Where date<===================
router.get('/reportStatistics/Member/:date_start/:date_end', (req, res) => {
    const d_start = req.params.date_start;
    const d_end = req.params.date_end;
    console.log(d_start);
    console.log(d_end);
    repMemberStatis_start_last(d_start, d_end, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                res.status(404).json({ msg: 'Not found' });
            } else {
                res.status(500).json({ msg: 'error retrieving data!!' });
            }
        } else {
            res.json(result);
        }
    });
});

module.exports = router;