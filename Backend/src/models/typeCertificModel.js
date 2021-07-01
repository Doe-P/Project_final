const dbCon = require('../../config/db');

// create new typeCertificate
exports.insertTypeCertific = (data, result) => {
    let sql = 'INSERT INTO tb_typecertificate (typeCerti_id, typeCerti_name) VALUES (?,?)';
    dbCon.query(sql, [data.typeCerti_id, data.typeCerti_name], (err, res) => {
        if (err) {
            console.log('Error while inserting data to typecertificate' + err);
            return result(err, null);
        }
        result(null, res);
    });
}

// update typeCertificate
exports.updateTypeCertific = (data, id, result) => {
    let sql = 'UPDATE tb_typecertificate SET typeCerti_name = ? WHERE typeCerti_id = ?';
    dbCon.query(sql, [data.typeCerti_name, id], (err, res) => {
        if (err) {
            console.log(`Error while updating typecertificate with ID:${id}` + err);
            return result(err, null);
        }

        if (res.affectedRows == 0) {
            // not found 
            return result({ kind: 'not found' }, null);
        }
        result(null, res);
    });
}

// delete typeCertificate
exports.deleteTypeCertific = (id, result) => {
    let sql = 'DELETE FROM tb_typecertificate WHERE typeCerti_id = ?';
    dbCon.query(sql, [id], (err, res) => {
        if (err) {
            console.log(`Error while deleting data from tb_typecertificate with ID${id}` + err);
            return result(err, null);
        }

        if (res.affectedRows == 0) {
            // not found
            return result({ kind: 'not found' }, null);
        }
        result(null, res);
    });
}

// get typeCertificate
exports.getTypeCertificate = (result) => {
    let sql = 'SELECT * FROM tb_typecertificate';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching data from typecertificate');
            return result(err, null);
        }
        result(null, res);
    });
}

// get Item typeCertificate
exports.getItem = (result) => {
    let sql = 'SELECT typeCerti_id, typeCerti_name FROM tb_typecertificate';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching Item typecertificate');
            return result(err, null);
        }
        result(null, res);
    });
}
exports.getMaxcertTypeId = (result) => {
    let sql = 'SELECT MAX(typeCerti_id) AS id FROM tb_typecertificate';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching Max unit_id' + err);
            return result(err, null);
        }
        result(null, res);
    });
  }