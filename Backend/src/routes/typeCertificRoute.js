const express = require("express");
const router = express.Router();

// import function from model
const {
  insertTypeCertific,
  updateTypeCertific,
  deleteTypeCertific,
  getTypeCertificate,
  getItem,
  getMaxcertTypeId,
} = require("../models/typeCertificModel");

// create new typeCertificate
router.post("/api/v1/typeCertificate", (req, res) => {
  // Validate request
  if (!req.body.typeCerti_id || !req.body.typeCerti_name) {
    return res.status(400).send({ msg: "Content can not be empty!!" });
  } else {
    const data = req.body;
    insertTypeCertific(data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ msg: "Some error occurred while creating typeCertificate" });
      }
      res.json(result);
    });
  }
});

// update
router.put("/api/v1/typeCertificate/:id", (req, res) => {
  // Validate request
  if (!req.body.typeCerti_name) {
    return res.status(400).send({ msg: "Content can not be empty!!" });
  }

  const id = req.params.id;
  const data = req.body;
  updateTypeCertific(data, id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found typeCertificate with ID` });
      } else {
        return res
          .status(500)
          .send({ msg: "Error updating typeCertificate with ID" });
      }
    }
    res.json(result);
  });
});

// delete
router.delete("/api/v1/typeCertificate/:id", (req, res) => {
  const id = req.params.id;
  deleteTypeCertific(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found typeCertificate with ID` });
      } else {
        return res
          .status(500)
          .send({ msg: "Could not delete typeCertificate with ID" });
      }
    }
    res.json(result);
  });
});

// get all
router.get("/api/v1/typecertificate", (req, res) => {
  getTypeCertificate((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving typeCertificate" });
    }
    res.json(result);
  });
});

// get Item
router.get("/api/v1/getItem/typecertificate", (req, res) => {
  getItem((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({
          msg: "Some error occurred while retrieving Item typeCertificate",
        });
    }
    res.json(result);
  });
});
router.get("/api/v1/certificateType-MaxID", (req, res) => {
    getMaxcertTypeId((err, result) => {
    if (err) {
      return res.status(500).send({
        msg: "Some error occurred while retrieving Max foundation ID!",
      });
    }
    res.json(result[0]);
  });
});
module.exports = router;
