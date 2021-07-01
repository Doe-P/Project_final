const dbCon = require('../../config/db');

// Create new typeActiv
exports.insertTypeActiv = (data, result) => {
    let sql = 'INSERT INTO tb_typeactivity (typeAct_id, typeAct_name) VALUES (?,?)';
    dbCon.query(sql, [data.typeAct_id, data.typeAct_name], (err, res) => {
        if (err) {
            console.log('Error while inserting data to typeActivity' + err);
            return result(err, null);
        }
        result(null, res);
    });
}

// update typeActiv
exports.updateTypeActiv = (data, id, result) => {
    let sql = 'UPDATE tb_typeactivity SET typeAct_name = ? WHERE typeAct_id = ?';
    dbCon.query(sql, [data.typeAct_name, id], (err, res) => {
        if (err) {
            console.log(`Error while updating typeactivity with ID:${id}` + err);
            return result(err, null);
        }

        if (res.affectedRows == 0) {
            // not found
            return result({ kind: 'not found' }, null);
        }
        result(null, res);
    });
}

// delete typeActiv
exports.deleteTypeActiv = (id, result) => {
    let sql = 'DELETE FROM tb_typeactivity WHERE typeAct_id = ?';
    dbCon.query(sql, [id], (err, res) => {
        if (err) {
            console.log(`Error while deleting data from typeactivity with ID:${id}` + err);
            return result(err, null);
        }

        if (res.affectedRows == 0) {
            // not found
            return result({ kind: 'not found' }, null);
        }
        result(null, res);
    });
}

// get typeActiv
exports.getTypeActiv = (result) => {
    let sql = 'SELECT * FROM tb_typeactivity';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching data from typeactivity' + err);
            return result(err, null);
        }
        result(null, res);
    });
}

// get typeActiv By ID
exports.getItem = (result) => {
    let sql = 'SELECT typeAct_id, typeAct_name FROM tb_typeactivity';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching Item typeactivity' + err);
            return result(err, null);
        }
        result(null, res);f
    });
}
exports.getMaxtypeActId = (result) => {
    let sql = 'SELECT MAX(typeAct_id) AS id FROM tb_typeactivity';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching Max unit_id' + err);
            return result(err, null);
        }
        result(null, res);
    });
  }