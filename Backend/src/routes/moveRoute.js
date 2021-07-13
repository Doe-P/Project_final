const e = require("express");
const express = require("express");
const router = express.Router();

// import function from model
const {
  countAllmovedetail,
  countAllmoveAdmin,
  countAllmoveAdmin_byfound,
  countFemalemovedetail,
  countFemalemove_Admin,
  countFemalemove_byFound,
  insert,
  AddMove,
  getMember,
  getmovedetailByid,
  addMove_detail,
  update_age,
  update,
  update_Status_Section,
  getAll,
  getmember_status,
  getById,
  getMoveWhereLocate,
  getAllMove,
  getMaxMoveId,
} = require("../models/moveModel");

// Create move
router.post("/api/v1/moves", (req, res) => {
  //const {name, surname}  = req.body
  // let data = [{name,surname}]
  // console.log(data);
  // console.log(surname);
  // return res.status(200).send({msg: data})
  // Validate request

  if (!req.body.move_id || !req.body.move_NO) {
    return res.status(400).send({ msg: "Content can not be empty!" });
  } else {
    let data = req.body;
    insert(data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ msg: "Some error occurred while create !!!" });
      }
      res.json(result);
    });
  }
});
router.post("/api/v1/add-move", (req, res) => {
  let data = req.body;
  if (data) {
    AddMove(data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ msg: "Some error occurred while create !!!" });
      }
      res.json(result);
    });
  } else {
    return res
      .status(500)
      .send({ msg: "can not save data because don't have data input" });
  }
});

router.post("/api/v1/move-detail", (req, res) => {
  let data = req.body;
  console.log(data.move_NO);
  if (data) {
    addMove_detail(data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ msg: "Some error occurred while create !!!" });
      }
      res.json(result);
    });
  } else {
    console.log("don't have data input");
  }
});

//update age
router.put("/api/v1/move-detail/:id", (req, res) => {
  let id = req.params.id;
  let age = req.body.age;
  console.log("id:" + id + "age:" + age);
  update_age(age, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: "Error" });
    } else {
      res.json(result);
    }
  });
});
// Update move
router.put("/api/v1/moves/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  update(data, id, (err, result) => {
    if (err) {
      return res.status(500).send({ msg: "Error" });
    }
    res.json(result);
  });
});

// Get all move
router.get("/api/v1/moves", (req, res) => {
  getAll((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({
          msg: "Some error occurred while retrieving move and movedetail",
        });
    }
    res.json(result);
  });
});

// Get data member for insert move and detail
router.get("/api/v1/getMember/move-detail/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  getMember(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res.status(404).send({ msg: "Not found" });
      } else {
        return res.status(500).send({ msg: "error retrieving data!!" });
      }
    }
    res.json(result);
  });
});

// Get move by id
router.get("/api/v1/moves/:id", (req, res) => {
  const id = req.params.id;
  getById(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found move and detail with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Error retrieving move and detail with id" + id });
      }
    }
    res.json(result[0]);
  });
});

// Get move by where fund_name
router.get("/api/v1/getMoveWhereLocate/:id", (req, res) => {
  const locate = req.params.id;
  getMoveWhereLocate(locate, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res.status(404).send({ msg: "Not found move " });
      } else {
        return res.status(500).send({ msg: "Error retrieving move " });
      }
    }
    res.json(result);
  });
});

// Get move all for admin
router.get("/api/v1/getAllMoves", (req, res) => {
  getAllMove((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving move" });
    }
    res.json(result);
  });
});

router.get("/api/v1/Move-MaxID", (req, res) => {
  getMaxMoveId((err, result) => {
    if (err) {
      return res.status(500).send({
        msg: "Some error occurred while retrieving Max Move ID",
      });
    }
    res.json(result[0]);
  });
});

// Get members where status
router.get("/api/v1/member-status", (req, res) => {
  getmember_status((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving members" });
    }
    res.json(result);
  });
});

// get item from move detail by id
router.get("/api/v1/move/getmove-detail/:id", (req, res) => {
  let id = req.params.id;
  getmovedetailByid(id, (err, result) => {
    if (err) {
      if (err.kind === "not found") {
        return res
          .status(404)
          .send({ msg: `Not found move and detail with id ${id}` });
      } else {
        return res
          .status(500)
          .send({ msg: "Error retrieving move and detail with id" + id });
      }
    }
    res.json(result);
  });
});
//count all member move detail
router.get("/api/v1/countAll/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  countAllmovedetail(id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving count all" });
    }
    res.json(result[0]);
  });
});

//count all member move  for admin
router.get("/api/v1/countAll", (req, res) => {
  countAllmoveAdmin((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving count all" });
    }
    res.json(result[0]);
  });
});
//count all member move  for admin by found
router.get("/api/v1/countAll-foundation/:id", (req, res) => {
  let id = req.params.id;
  countAllmoveAdmin_byfound(id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving count all" });
    }
    res.json(result[0]);
  });
});
//count female member move detail
router.get("/api/v1/countfemale/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  countFemalemovedetail(id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving count all" });
    }
    res.json(result[0]);
  });
});

//count female member move for admin
router.get("/api/v1/countfemale", (req, res) => {
  countFemalemove_Admin((err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ msg: "Some error occurred while retrieving count all" });
    }
    res.json(result[0]);
  });
});

//count female member move for user
router.get("/api/v1/countfemale-found/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    countFemalemove_byFound(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ msg: "Some error occurred while retrieving count all" });
      }
      res.json(result[0]);
    });
  });

  // Update ສະຖານະ status_sect ຂອງ tb_section ເປັນ "ລົບລ້າງ" ເມື່ອຈຳນວນສະມາຊິກຍົກຍ້າຍອອກເປັນໄປໝົດ ຫຼື ຈຳນວນສະມາຊິກຂອງຈຸນັ້ນ = 0 ຫຼືຈົບການສຶກສາແລ້ວ
router.put('/api/v1/Update-Status/section/:id', (req, res) => {
    const id = req.params.id;
    update_Status_Section(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found` });
            } else {
                return res.status(500).send({ msg: `Error updating section` });
            }
        }
        res.json(result);
    });
});


module.exports = router;
