// import express
const express = require("express");

// init express router
const router = express.Router();

// import functions from model
const {
  getEducationLevel,
  getEducationlevelById,
  insertEducationLevel,
  updateEducationLevelById,
  deleteEducationLevelById,
  getItemsEduc,
  getMaxDegreeId,
} = require("../models/educationlevelModel");

// Get all educations
// router.get('/api/v1/education-levels', async (req, res) => {
//     await getEducationLevel((err, result) => {
//         if (err) {
//             return res.status(500).send({ msg: 'Some error occurred while retrieving educationlevel' });
//         } else {
//             res.json(result);
//         }
//     });
// });

router.get("/api/v1/education-levels", (req, res) => {
  getEducationLevel((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving educationlevel" });
    } else {
      res.json(result);
    }
  });
});

// Get single educationlevel by id
router.get("/api/v1/education-levels/:id", (req, res) => {
  const id = req.params.id;
  getEducationlevelById(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found educationlevel with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: " Error retrieving educationlevel with id " + id });
      }
    }
    res.json(result);
  });
});

// Create new educationlevel
router.post("/api/v1/education-levels", (req, res) => {
  // Validate Request
  if (!req.body.level_id || !req.body.level_name) {
    return res.status(400).send({ msg: "Content can not be empty!" });
  } else {
    const data = req.body;
    insertEducationLevel(data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({
            msg: "Some error occurred while creating the educationlevel",
          });
      }
      res.json(result);
    });
  }
});

// Update educationlevel
router.put("/api/v1/education-levels/:id", (req, res) => {
  // Validate Request
  if (!req.body.level_name) {
    return res.status(400).send({ msg: "Content can not be empty!" });
  }

  const id = req.params.id;
  const data = req.body;
  updateEducationLevelById(data, id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found educationlevel with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Error updating educationlevel with id" + id });
      }
    }
    res.json(result);
  });
});

// Delete educationlevel
router.delete("/api/v1/education-levels/:id", (req, res) => {
  const id = req.params.id;
  deleteEducationLevelById(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found educationlevel with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Could not delete educationlevel with id" + id });
      }
    }
    res.json(result);
  });
});

// Get Items
router.get("/api/v1/getItem/education-levels", (req, res) => {
  getItemsEduc((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({
          msg: "Some error occurred while retrieving item educationlevel",
        });
    }
    res.json(result);
  });
});
router.get("/api/v1/Degree-MaxID", (req, res) => {
  getMaxDegreeId((err, result) => {
    if (err) {
      return res.status(500).send({
        msg: "Some error occurred while retrieving Max foundation ID!",
      });
    }
    res.json(result[0]);
  });
});

module.exports = router;
