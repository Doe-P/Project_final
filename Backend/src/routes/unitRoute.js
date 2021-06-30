// import express
const express = require("express");

// init express router
const router = express.Router();

// import function from model
const {
  getUnit,
  getUnitById,
  insertUnit,
  updateUnitById,
  deleteUnitById,
  getItemUnit,
  getMaxUnitId,
} = require("../models/unitModel");

// Get all units
router.get("/api/v1/units", (req, res) => {
  getUnit((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: `some error occurred while retrieving unit` });
    } else {
      res.json(result);
    }
  });
});

// Get single unit
router.get("/api/v1/units/:id", (req, res) => {
  const id = req.params.id;
  getUnitById(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res.status(404).send({ msg: `Not found unit with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: " Error retrieving unit with id " + id });
      }
    }
    res.json(result[0]);
  });
});

// Create new unit
router.post("/api/v1/units", (req, res) => {
  // Validate Request
  if (
    !req.body.unit_id ||
    !req.body.unit_name ||
    !req.body.fund_id ||
    !req.body.date_unit ||
    !req.body.status_unit
  ) {
    return res.status(400).send({ msg: "Content can not be empty!" });
  } else {
    const data = req.body;
    insertUnit(data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ msg: "Some error occurred while creating the uni", err });
      } else {
        res.json(result);
      }
    });
  }
});

// Update unit
router.put("/api/v1/units/:id", (req, res) => {
  if (
    !req.body.unit_name ||
    !req.body.fund_id ||
    !req.body.date_unit ||
    !req.body.status_unit
  ) {
    return res.status(400).send({ msg: "Content can not be empty!" });
  }

  const id = req.params.id;
  const data = req.body;
  updateUnitById(data, id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res.status(404).send({ msg: `Not found unit with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Error updating unit with id" + id });
      }
    }
    res.json(result);
  });
});

// Delete unit
router.delete("/api/v1/units/:id", (req, res) => {
  const id = req.params.id;
  deleteUnitById(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found unit with the id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Could not delete unit with the id" + id });
      }
    }
    res.json(result);
  });
});

// get Item unit
router.get("/api/v1/getItem-units/:id", (req, res) => {
  const id = req.params.id;
  getItemUnit(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found Item unit with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Some error occurred while retrieving item units" });
      }
    }
    res.json(result);
  });
});
router.get("/api/v1/Units-MaxID", (req, res) => {
  getMaxUnitId((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({
          msg: "Some error occurred while retrieving Max foundation ID!",
        });
    }
    res.json(result[0]);
  });
});

module.exports = router;
