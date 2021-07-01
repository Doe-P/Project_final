const express = require("express");
const router = express.Router();

// import function from model
const {
  insertTypeActiv,
  updateTypeActiv,
  deleteTypeActiv,
  getTypeActiv,
  getItem,
  getMaxtypeActId,
} = require("../models/typeActivModel");

// Create new typeActiv
router.post("/api/v1/typeActivity", (req, res) => {
  // Validate request
  if (!req.body.typeAct_id || !req.body.typeAct_name) {
    return res.status(400).send({ msg: "Content can not be empty!!" });
  } else {
    const data = req.body;
    insertTypeActiv(data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ msg: "Some error occurred while creating typeActivity" });
      }
      res.json(result);
    });
  }
});

// Update typeActivity
router.put("/api/v1/typeActivity/:id", (req, res) => {
  // Validate request
  if (!req.body.typeAct_name) {
    return res.status(400).send({ msg: "Content can not be empty!!" });
  }

  const id = req.params.id;
  const data = req.body;
  updateTypeActiv(data, id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res.status(404).send({ msg: "Not found typeActivity" });
      } else {
        return res.status(500).send({ msg: "Error updating typeActivity" });
      }
    }
    res.json(result);
  });
});

// Delete typeActivity
router.delete("/api/v1/typeActivity/:id", (req, res) => {
  const id = req.params.id;
  deleteTypeActiv(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res.status(404).send({ msg: `Not found typeActivity with ID` });
      } else {
        return res
          .status(500)
          .send({ msg: "Could not delete typeActivity with ID" });
      }
    }
    res.json(result);
  });
});

// Get typeActivity
router.get("/api/v1/typeActivity", (req, res) => {
  getTypeActiv((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Somr error occurred while retrieving typeActivity" });
    }
    res.json(result);
  });
});

// Get typeActivity By ID
router.get("/api/v1/getItem/typeActivity", (req, res) => {
  getItem((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({
          msg: "Somr error occurred while retrieving Item typeActivity",
        });
    }
    res.json(result);
  });
});
router.get("/api/v1/typeActivity-MaxID", (req, res) => {
  getMaxtypeActId((err, result) => {
    if (err) {
      return res.status(500).send({
        msg: "Some error occurred while retrieving Max foundation ID!",
      });
    }
    res.json(result[0]);
  });
});
module.exports = router;
