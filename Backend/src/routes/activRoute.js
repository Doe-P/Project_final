const express = require('express');
const router = express.Router();

// import function from model
const { insert,
     update,
      getAll,
      getActivity, 
      getMaxActivityId, 
      getActi, 
      getActivity_Detail_byID, 
      getActivity_Detail,
      getMember_admin, 
      getMember_client } = require('../models/activModel');

// Create new activity
router.post('/api/v1/new-activity', (req, res) => {
    const data = req.body.data;
    insert(data,(err, result) => {
        if (err) {
            return res.status(500).send({ msg: `Some error occurred while create!` });
        }
        res.json(result);
    });
});

// Update activity
router.put('/api/v1/activity/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    update(data, id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found activity` });
            } else {
                return res.status(500).send({ msg: 'Error updating activity' });
            }
        }
        res.json(result);
    });
});

// Get data activity for client where acti_id and fund_name
router.get('/api/v1/activity/:id', (req, res) => {
    const id = req.params.id;
    getAll(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found data with ID` });
            } else {
                return res.status(500).send({ msg: `Error retrieving data` });
            }
        }
        res.json(result);
    });

});

// Get data activity for admin where acti_title
router.get('/api/v1/activity', (req, res) => {
    //console.log(id);
    getActi((err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: 'Not found' });
            } else {
                return res.status(500).send({ msg: 'Error retrieving data' });
            }
        }
        res.json(result);
    });
});

// Get data activity_detail for client where fund_name
router.get('/api/v1/activityDetail-client/:id', (req, res) => {
    const id = req.params.id;
    getActivity_Detail(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: 'Not found' });
            } else {
                return res.status(500).send({ msg: 'Error retrieving data' });
            }
        }
        res.json(result);
    });
});

// Get data activity_detail for admin 
router.get('/api/v1/activityDetail/:id', (req, res) => {
    const id = req.params.id;
    getActivity_Detail_byID(id,(err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Error retrieving data' });
        }
        res.json(result);
    });
});

// Get data member for admin
router.get('/api/v1/getMembers', (req, res) => {
    getMember_admin((err, result) => {
        if (err) {
            return res.status(500).send({ msg: 'Error retrieving data' });
        }
        res.json(result);
    });
});

// Get data member for client
router.get('/api/v1/getMembers/:id', (req, res) => {
    const id = req.params.id;
    getMember_client(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: 'Not found' });
            } else {
                return res.status(500).send({ msg: 'Error retrieving data' });
            }
        }
        res.json(result);
    });
});

router.get("/api/v1/Activity-MaxID", (req, res) => {
    getMaxActivityId((err, result) => {
      if (err) {
        return res
          .status(500)
          .send({
            msg: "Some error occurred while retrieving Max Activity",
          });
      }
      res.json(result[0]);
    });
  });

  //get data activity by id
  router.get('/api/v1/activity-byID/:id',(req,res)=>{
      const id = req.params.id;
      getActivity(id,(err,result)=>{
          if(err){
            return res.status(500).send({msg: "Some error occurred get data Activity by id",
            }); 
          }
          res.json(result[0])
      })
  })

module.exports = router;