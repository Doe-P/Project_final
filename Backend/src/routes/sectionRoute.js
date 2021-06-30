// import express
const express = require("express");

// init express router
const router = express.Router();

// import function from model
const {
  getSections,
  getSectionById,
  insertSection,
  updateSectionById,
  deleteSectionById,
  getMaxSectId,
} = require("../models/sectionModel");

// Get all sections
router.get("/api/v1/sections", (req, res) => {
  getSections((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving sections" });
    } else {
      res.json(result);
    }
  });
});

// Get single section
router.get("/api/v1/sections/:id", (req, res) => {
  const id = req.params.id;
  getSectionById(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res.status(404).send({ msg: `Not found section with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Error retrieving section with id" + id });
      }
    }
    res.json(result);
  });
});

// Create new section
router.post("/api/v1/sections", (req, res) => {
  // Validate Request
  if (
    !req.body.sect_id ||
    !req.body.sect_name ||
    !req.body.unit_id ||
    !req.body.date_sect ||
    !req.body.status_sect
  ) {
    return res.status(400).send({ msg: "Content can not be empty!" });
  } else {
    const data = req.body;
    insertSection(data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ msg: "Some error occurred while creating section" });
      }
      res.json(result);
    });
  }
});

// Update section
router.put("/api/v1/sections/:id", (req, res) => {
  // Validate Request
  if (
    !req.body.sect_name ||
    !req.body.unit_id ||
    !req.body.date_sect ||
    !req.body.status_sect
  ) {
    return res.status(400).send({ msg: "Content can not be empty!" });
  }

  const id = req.params.id;
  const data = req.body;
  updateSectionById(data, id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res.status(404).send({ msg: `Not found section with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Error updating section with id" + id });
      }
    }
    res.json(result);
  });
});

// Delete section
router.delete("/api/v1/sections/:id", (req, res) => {
  const id = req.params.id;
  deleteSectionById(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found section with the id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Could not delete section with the id" + id });
      }
    }
    res.json(result);
  });
});
router.get("/api/v1/Sections-MaxID", (req, res) => {
  getMaxSectId((err, result) => {
    if (err) {
      return res.status(500).send({
        msg: "Some error occurred while retrieving Max foundation ID!",
      });
    }
    res.json(result[0]);
  });
});

module.exports = router;
