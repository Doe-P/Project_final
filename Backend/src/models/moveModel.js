// import connection from conf
const dbCon = require("../../config/db");

// Insert data to tb_move and tb_movedetail
exports.insert = (data, result) => {
  console.log(data);
  let value1 = []; // ຂໍ້ມູນທີ່ຈະ insert tb_move
  let value2 = []; // ຂໍ້ມູນທີ່ຈະ insert tb_move_detail
  let value3 = []; // ຂໍ້ມູນທີ່ຈະ update tb_member

  // loop ຂໍ້ມູນຈາກ data ມາເກັັບໃນ array []
  for (let i = 0; i < data.length; i++) {
    value1.push([
      data[i].move_id,
      data[i].move_NO,
      data[i].m_Year,
      data[i].reason,
      data[i].qty_move,
      data[i].locate,
      data[i].sign_by,
      data[i].date_move,
    ]);
    value2.push([data[i].move_id, data[i].member_id]);
    value3.push([data[i].member_id]);
  }
  console.log(value1);
  console.log(value2);
  console.log(value3);

  // this function  ຄັດເອົາຂໍ້ມູນທີ່ຊໍ້າກັນເອົາພຽງຕົວດຽວເທົ່ານັ້ນ example: [1,1,1,1] = [1]
  function uniqBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }
  let newValue1 = uniqBy(value1, JSON.stringify); // convert

  // insert tb_move
  let sql1 =
    "INSERT INTO tb_move (move_id, move_NO, m_Year, reason, amount_move, locate, sign_by, date_move) VALUES ?";
  dbCon.query(sql1, [newValue1], (err, res) => {
    if (err) {
      console.log("ERROR1:" + err);
      return result(err, null);
    } else if (res.affectedRows > 0) {
      // insert tb_moved_detail
      let sql2 = "INSERT INTO tb_move_detail (move_id, member_id) VALUES ?";
      dbCon.query(sql2, [value2], (err, res) => {
        if (err) {
          console.log("ERROR2:" + err);
          return result(err, null);
        } else {
          // update ສະຖານະຂອງສະມາຊິກໃຫ້ເປັນພົ້ນກະສຽນ(retired) ຂອງ tb_member
          let res = "";
          for (let i = 0; i < value3.length; i++) {
            const newValue3 = value3[i];
            let status = "move";
            let sql3 = "UPDATE tb_member SET status = ? WHERE member_id = ?";
            res += dbCon.query(sql3, [status, newValue3], (err) => {
              if (err) {
                console.log("ERROR3:" + err);
                return result(err, null);
              }
            });
          }
          result(null, res);
        }
      });
    }
  });
  // let sql1 = 'INSERT INTO tb_move (move_id, move_NO, m_Year, reason, amount_move, locate, sign_by, date_move) VALUES (?,?,?,?,?,?,?,?)';
  // dbCon.query(sql1, [data.move_id, data.move_NO, data.m_Year, data.reason, data.amount_move, data.locate, data.sign_by, data.date_move], (err, res) => {
  //     if (err) {
  //         console.log('Error while inserting data to tb_move==>', err);
  //         return result(err, null);
  //     } else if (data.move_id == data.move_id) {
  //         let sql2 = 'INSERT INTO tb_move_detail (move_id, member_id) VALUES ?';
  //         var values = [
  //             ['m006', 'fnns1112-17'],
  //             ['m006', 'fnns1113-17'],
  //             ['m006', 'fnns1114-17'],
  //           ];
  //         dbCon.query(sql2, [values[i].move_id, ], (err, res) => {
  //             if (err) {
  //                 console.log('Error while inserting tb_move_detail==>' + err);
  //                 return result(err, null);
  //             }
  //             result(null, res);
  //         });
  //     }
  // });
};

//new method insert data by doe
exports.AddMove = (data, result) => {
  let sql = "INSERT INTO tb_move SET ?";
  dbCon.query(sql, [data], (err, res) => {
    if (err) {
      console.log("ERROR2:" + err);
      return result(err, null);
    } else {
      result(null, res);
    }
  });
};

//add move detail
exports.addMove_detail = (data, result) => {
  let sql =
    "INSERT INTO tb_move_detail (move_NO,move_id,member_id) VALUES(?,?,?)";
  dbCon.query(sql, [data.move_NO, data.move_id, data.member_id], (err, res) => {
    if (err) {
      console.log("Error:" + err);
      return result(err, null);
    } else {
      let sql2 = "UPDATE tb_member SET status=? WHERE member_id=?";
      let status = "ຍົກຍ້າຍ";
      dbCon.query(sql2, [status, data.member_id], (err, res) => {
        if (err) {
          console.log("Error:" + err);
          return result(err, null);
        } else {
          return result(null, res);
        }
      });
    }
  });
};

exports.update_age = (age, id, result) => {
  try {
    let sql3 = "UPDATE tb_move SET amount_move=? WHERE move_id=?";
    dbCon.query(sql3, [age, id], (err, res) => {
      if (err) {
        console.log("Error:" + err);
        return result(err, null);
      } else {
        return result(res, null);
      }
    });
  } catch (err) {
    console.log("catch:" + err);
  }
};
// Update data to tb_move and tb_movedetail
exports.update = (data, id, result) => {
  console.log(data);
  let sql =
    "UPDATE tb_move SET move_NO = ?, m_Year = ?, reason = ?,locate=?,sign_by=?, date_move = ? WHERE move_id = ?";
  dbCon.query(
    sql,
    [
      data.move_NO,
      data.m_Year,
      data.reason,
      data.locate,
      data.sign_by,
      data.date_move,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log(`Error while updating tb_move with ID${id}` + err);
        return result(err, null);
        // } else if (id == id) {
        //     console.log(id);
        //     console.log(data.member_id);
        //     let sql2 = 'UPDATE tb_move_detail SET member_id = ? WHERE move_id = ?';
        //     dbCon.query(sql2, [data.member_id, id], (err, res) => {
        //         if (err) {
        //             console.log('Error while updating tb_move_detail' + err);
        //             return result(err, null);
        //         }
        //         result(null, res);
        //     });
      }

      if (res.affectedRows == 0) {
        // nort found
        return result({ kind: "not found" }, null);
      }
      result(null, res);
    }
  );
};

// Delete some member from detail
// exports.delete = (id, result) => {
//     let status = 'member';  //ໝາຍເຖິງສະຖານະກັບມາເປັນສະມາຊິກ
//     let sql1 = 'DELETE FROM tb_move '
// }

// Get all move and movodetail
exports.getAll = (result) => {
  let sql =
    "SELECT tb_move.move_id, tb_move.move_NO, tb_move.m_Year, tb_move.reason,tb_move.locate, tb_move.sign_by, tb_move.date_move FROM tb_move";
  dbCon.query(sql, (err, res) => {
    if (err) {
      console.log(
        "Error while fetching data tb_move and tb_move_detail==>" + err
      );
      return result(err, null);
    }
    result(null, res);
  });
};

// Get single move and movedetail by id
exports.getById = (id, result) => {
  let sql =
    "SELECT tb_move.move_id, tb_move.move_NO, tb_move.m_Year, tb_move.reason,  tb_move.locate, tb_move.sign_by, tb_move.date_move, tb_move_detail.member_id FROM tb_move INNER JOIN tb_move_detail ON tb_move.move_id = tb_move_detail.move_id WHERE tb_move.move_id = ?";
  dbCon.query(sql, [id], (err, res) => {
    if (err) {
      console.log(
        `Error while fetching data tb_move and tb_movedetail by ID:${id}` + err
      );
      return result(err, null);
    }

    if (res.length) {
      console.log("found data");
      result(null, res);
      return;
    }
    // not found
    result({ kind: "not found" }, null);
  });
};

// Get move where locate
exports.getMoveWhereLocate = (locate, result) => {
  let sql = `SELECT move_id, move_NO, m_Year, reason, qty_move, locate, sign_by, date_move FROM tb_move WHERE locate = ?`;
  dbCon.query(sql, [locate], (err, res) => {
    if (err) {
      console.log(`Error while fetching tb_move by locate${locate}` + err);
      return result(err, null);
    }

    if (res.length) {
      // found
      return result(null, res);
    }
    // not found
    result({ kind: "not found " }, null);
  });
};

// Get move all for Admin
exports.getAllMove = (result) => {
  let sql =
    "SELECT move_id, move_NO, m_Year, reason, qty_move, locate, sign_by, date_move FROM tb_move";
  dbCon.query(sql, (err, res) => {
    if (err) {
      console.log("Error while fetching move for admin");
      return result(err, null);
    }
    result(null, res);
  });
};

exports.getmember_status = (result) => {
  let sql =
    "SELECT tb_member.member_id,tb_member.member_name,tb_member.surname,tb_member.gender,tb_typemember.typemember,tb_section.sect_name,tb_unit.unit_name,tb_foundation.fund_name FROM tb_member INNER JOIN tb_typemember ON tb_member.typemember_id=tb_typemember.typemember_id INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id WHERE tb_member.status=?";
  const status = "ສະມາຊິກ";
  dbCon.query(sql, [status], (err, res) => {
    if (err) {
      console.log("Error while fetching data members status");
      return result(err, null);
    } else {
      result(null, res);
    }
  });
};

// Get largest column move ID
exports.getMaxMoveId = (result) => {
  let sql = "SELECT MAX(move_id) AS id FROM tb_move";
  dbCon.query(sql, (err, res) => {
    if (err) {
      console.log("Error while fetching Max move_id" + err);
      return result(err, null);
    }
    result(null, res);
  });
};
// Get data member for insert move and detail
exports.getMember = (id, result) => {
  try {
    //let status = 'member';
    let sql = `SELECT tb_member.member_id, tb_member.member_name, tb_member.surname,tb_member.gender,tb_typemember.typemember, tb_section.sect_name, tb_unit.unit_name, tb_foundation.fund_name FROM tb_section 
        INNER JOIN tb_member ON tb_section.sect_id = tb_member.sect_id 
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id 
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id WHERE tb_member.status like N'ສະມາຊິກ' AND tb_section.sect_id = ?`;
    console.log(id);

    dbCon.query(sql, [id], (err, res) => {
      if (err) {
        console.log(`error while fetching data member`);
        return result(err, null);
      }

      if (res.length) {
        // found
        return result(null, res);
      }
      // not found
      result({ kind: "not found" }, null);
    });
  } catch (error) {
    console.log(error);
  }
};

// Get single move and movedetail by id
exports.getmovedetailByid = (id, result) => {
  let sql = `SELECT tb_move_detail.move_id,tb_move_detail.move_NO,tb_member.member_name,tb_member.surname,tb_member.gender,tb_move.reason,tb_move.m_Year,tb_section.sect_name,tb_unit.unit_name,tb_foundation.fund_name 
    FROM tb_move_detail 
    INNER JOIN tb_move ON tb_move_detail.move_id=tb_move.move_id 
    INNER JOIN tb_member ON tb_move_detail.member_id=tb_member.member_id 
    INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id 
    INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id 
    INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id 
    WHERE tb_move_detail.move_id=?`;
  dbCon.query(sql, [id], (err, res) => {
    if (err) {
      console.log(
        `Error while fetching data tb_move and tb_movedetail by ID:${id}` + err
      );
      return result(err, null);
    }

    if (res.length) {
      console.log("found data");
      result(null, res);
      return;
    }
    // not found
    result({ kind: "not found" }, null);
  });
};

// count member move all
exports.countAllmovedetail = (id, result) => {
    console.log(id);
  let sql = `SELECT COUNT(tb_move_detail.member_id) AS amount FROM tb_move_detail 
    INNER JOIN tb_member ON tb_move_detail.member_id=tb_member.member_id 
    WHERE tb_move_detail.move_id=?`;
  dbCon.query(sql, [id], (err, res) => {
    if (err) {
        console.log(`error while fetching count all move detail`);
        return result(err, null);
    }
      // found
      return result(null, res);
    })
  };

  // count member move all
exports.countAllmoveAdmin = (result) => {
let sql = `SELECT COUNT(member_id) AS amount FROM tb_member WHERE status='ຍົກຍ້າຍ'`;
dbCon.query(sql, (err, res) => {
  if (err) {
      console.log(`error while fetching count all move detail`);
      return result(err, null);
  }
    // found
    return result(null, res);
  })
};

  // count member move all
  exports.countAllmoveAdmin_byfound = (id, result) => {
    console.log(id);
  let sql = `SELECT COUNT(tb_member.member_id) AS amount FROM tb_member 
  INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id 
  INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id 
  INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id 
  WHERE tb_member.status='ຍົກຍ້າຍ' AND tb_foundation.fund_id=?`;
  dbCon.query(sql, [id], (err, res) => {
    if (err) {
        console.log(`error while fetching count all move detail`);
        return result(err, null);
    }
      // found
      return result(null, res);
    })
  };

// count female member move
exports.countFemalemovedetail = (id, result) => {
  let sql = `SELECT COUNT(tb_move_detail.member_id) AS amount FROM tb_move_detail 
    INNER JOIN tb_member ON tb_move_detail.member_id=tb_member.member_id 
    WHERE tb_member.gender='ຍິງ' AND tb_move_detail.move_id=?`;
  dbCon.query(sql, [id], (err, res) => {
    if (err) {
        console.log(`error while fetching count all move detail`);
        return result(err, null);
    }
     // found
     return result(null, res);
  });
};


// count female member move for admin
exports.countFemalemove_Admin = (result) => {
  let sql = `SELECT COUNT(member_id) AS amount FROM tb_member WHERE gender='ຍິງ' AND status='ຍົກຍ້າຍ'`;
  dbCon.query(sql, (err, res) => {
    if (err) {
        console.log(`error while fetching count all move detail`);
        return result(err, null);
    }
     // found
     return result(null, res);
  });
};


// count female member move for user 
exports.countFemalemove_byFound = (id, result) => {
  let sql = `SELECT COUNT(tb_member.member_id) AS amount FROM tb_member 
  INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id 
  INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id 
  INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id 
  WHERE tb_member.status='ຍົກຍ້າຍ' AND tb_member.gender='ຍິງ' AND tb_foundation.fund_id=?`;
  dbCon.query(sql, [id], (err, res) => {
    if (err) {
        console.log(`error while fetching count all move detail`);
        return result(err, null);
    }
     // found
     return result(null, res);
  });
};


// Update ສະຖານະ status_sect ຂອງ tb_section ເປັນ "ລົບລ້າງ" ເມື່ອຈຳນວນສະມາຊິກຍົກຍ້າຍອອກເປັນໄປໝົດ ຫຼື ຈຳນວນສະມາຊິກຂອງຈຸນັ້ນ = 0 ຫຼືຈົບການສຶກສາແລ້ວ
exports.update_Status_Section = (id, result) => {
  try {
      let status = 'ບໍ່ໄດ້ບັນຈຸ';
      let sql1 = `SELECT COUNT(*) AS Qty FROM tb_section 
      INNER JOIN tb_member ON tb_section.sect_id = tb_member.sect_id
      WHERE tb_member.status = N'member' AND tb_section.sect_id = ?`;
      dbCon.query(sql1, [id], (err, res) => {
          if (err) {
              console.log(`Error while fetching count member from section`);
              return result(err, null);
          }
          //console.log(res[0].Qty);
          let num = parseInt(res[0].Qty);

          if (num == 0) {
              let sql2 = `UPDATE tb_section SET status_sect = ? WHERE sect_id = ?`;
              dbCon.query(sql2, [status, id], (err, res) => {
                  if (err) {
                      console.log(`Error while updating status tb_section with ID${id}==>` + err);
                      return result(err, null);
                  }

                  if (res.affectedRows == 0) {
                      // not found
                      return result({ kind: 'not found' }, null);
                  }
                  result(null, res);
              });
          }
      });
  } catch (error) {
      console.log(error);
  }
}
