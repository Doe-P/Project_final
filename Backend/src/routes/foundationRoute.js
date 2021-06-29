// import express module
const express = require("express");

// init express router
const router = express.Router();

// import function from model
const {
  getFoundations,
  getFoundationById,
  insertFoundation,
  updateFoundationById,
  deleteFoundationById,
  getItems,
  getMaxFoundId,
} = require("../models/foundationModel");

// Get all foundations
router.get("/api/v1/foundations", (req, res) => {
  getFoundations((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving foundations" });
    } else {
      res.json(result);
    }
  });
});

// Get single foundation by id
router.get("/api/v1/foundations/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  getFoundationById(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found foundation with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: " Error retrieving foundation with id " + id });
      }
    }
    res.json(result[0]);
  });
});

// Create new foundation
router.post("/api/v1/foundations", (req, res) => {
  // Validate Request

  let fund_id = req.body.txt_found_ID;
  let fond_name = req.body.txt_foundname;
  let date_fund = req.body.found_date;
  let status_fund = req.body.found_status;
  insertFoundation(
    fund_id,
    fond_name,
    date_fund,
    status_fund,
    (err, result) => {
      if (err) {
        res
          .status(500)
          .send({ msg: "Some error occurred while creating the foundation" });
        return;
      } else {
        //res.status(200).json({msg: 'Success', result});
        res.json(result);
      }
    }
  );
});

// Update foundation
router.put("/api/v1/foundations/:id", (req, res) => {
  // Validate Request
  if (!req.body.fund_name || !req.body.date_fund || !req.body.status_fund) {
    return res.status(400).send({ msg: "Content can not be empty!" });
  }

  const id = req.params.id;
  const data = req.body;
  console.log(data);
  updateFoundationById(data, id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found foundation with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Error updating foundation with id" + id });
      }
    }
    res.json(result);
  });
});

// Delete foundation
router.delete("/api/v1/foundations/:id", (req, res) => {
  // Validate Request
  if (!req.params.id) {
    return res.status(400).send({ msg: " Please fill Id" });
  }

  const id = req.params.id;
  deleteFoundationById(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found foundation with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Could not delete foundation with id" + id });
      }
    }
    res.json(result);
  });
});

// Get items testing
router.get("/api/v1/getItem/foundations", (req, res) => {
  getItems((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving foundations" });
    } else {
      res.json(result);
    }
  });
});
// Get Max fund_id
router.get('/api/v1/foundations-MaxID', (req, res) => {
  getMaxFoundId((err, result) => {
      if (err) {
          return res.status(500).send({msg: 'Some error occurred while retrieving Max foundation ID!'})
      }
      res.json(result[0]);
  });
});
module.exports = router;
