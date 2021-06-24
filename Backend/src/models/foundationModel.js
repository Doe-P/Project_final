// import connection from config folder
const dbCon = require("../../config/db");

// Get all foundations
exports.getFoundations = (result) => {
  dbCon.query("SELECT * FROM tb_foundation", (err, res) => {
    if (err) {
      console.log("Error while fetching foundations", err);
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
};

// Get single foundation by ID
exports.getFoundationById = (id, result) => {
  console.log(id);
  dbCon.query(
    "SELECT * FROM tb_foundation WHERE fund_id = ?",
    [id],
    (err, res) => {
      if (err) {
        console.log("Error while fetching foundation by id", err);
        result(err, null);
        return;
      }

      if (res.length) {
        // found foundation
        console.log("found foundation");
        // result(null, res[0]);  // res[0] ໝາຍເຖິງຕັດ Array ອອກ
        result(null, res);
        return;
      }

      // not found foundation with the id
      result({ kind: "not found" }, null);
    }
  );
};

// Insert new foundation to database
exports.insertFoundation = (
  fund_id,
  fund_name,
  date_fund,
  status_fund,
  result
) => {
  dbCon.query(
    "INSERT INTO tb_foundation(fund_id,fund_name,date_fund,status_fund) Values(?,?,?,?)",
    [fund_id, fund_name, date_fund, status_fund],
    (err, res) => {
      if (err) {
        console.log("Error while inserting data" + err);
        result(err, null);
        return;
      } else {
        result(null, res);
      }
    }
  );
};

// Update foundation to database
exports.updateFoundationById = (data, id, result) => {
  dbCon.query(
    "UPDATE tb_foundation SET fund_name = ?, date_fund = ?, status_fund = ? WHERE fund_id =?",
    [data.fund_name, data.date_fund, data.status_fund, id],
    (err, res) => {
      if (err) {
        console.log("Error while updating the user");
        result(err, null);
        return;
      }

      // check affectedRows == 0 ໝາຍເຖິງບໍ່ພົບ Id ແລ້ວສົ່ງຄ່າ kind: 'not found' ອອກໄປໃຫ້   if (err.kind === 'not found') ກວດສອບໃນ updateUserById in userRoute
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not found" }, null);
        return;
      }
      result(null, res);
    }
  );
};

// Delete foundation
exports.deleteFoundationById = (id, result) => {
  dbCon.query(
    "DELETE FROM tb_foundation WHERE fund_id = ?",
    [id],
    (err, res) => {
      if (err) {
        console.log("Error while deleting the user");
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not found" }, null);
        return;
      }
      // deleted foundation with id
      result(null, res);
    }
  );
};

// Get item foundation
exports.getItems = (result) => {
  dbCon.query("SELECT fund_id, fund_name FROM tb_foundation", (err, res) => {
    if (err) {
      console.log("Error while getItem foundation", err);
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
};
// Get largest column foundation ID
exports.getMaxFoundId = (result) => {
  let sql = 'SELECT MAX(fund_id) AS id FROM tb_foundation';
  dbCon.query(sql, (err, res) => {
      if (err) {
          console.log('Error while fetching Max fund_id' + err);
          return result(err, null);
      }
      result(null, res);
  });
}