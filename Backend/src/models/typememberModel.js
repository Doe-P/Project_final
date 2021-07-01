// import connection from config
const dbCon = require('../../config/db');

// Get all typemember
exports.getType_mb = (result) => {
    dbCon.query('SELECT * FROM tb_typemember', (err, res) => {
        if (err) {
            console.log('Error while fetching typemembers ==>', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// Get single typemember
exports.getType_mbById = (id, result) => {
    dbCon.query('SELECT * FROM tb_typemember WHERE typemember_id = ?', [id], (err, res) => {
        if (err) {
            console.log(`Error while fetching typemember by id ==>${id}`, err);
            result(err, null);
            return;
        }

        if (res.length) {
            // found typemember
            console.log('found typemember');
            result(null, res);
            return;
        }
        // not found typemember with id
        result({ kind: 'not found' }, null);
    });
}

// Insert new typemember to database
exports.insertType_mb = (data, result) => {
    dbCon.query('INSERT INTO tb_typemember SET ?', [data], (err, res) => {
        if (err) {
            console.log('Error while inserting typemember ==>', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// Update typemember to database
exports.updateType_mbById = (data, id, result) => {
    const sql = 'UPDATE tb_typemember SET typemember = ?, money = ? WHERE typemember_id = ?';
    dbCon.query(sql, [data.typemember, data.money, id], (err, res) => {
        if (err) {
            console.log('Error while updating the typemember', err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found typemember with id
            result({ kind: 'not found' }, null)
            return;
        }
        //found typemember
        result(null, res);
    })
}

// Delete typemember
exports.deleteType_mbById = (id, result) => {
    dbCon.query('DELETE FROM tb_typemember WHERE typemember_id = ?', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting the typeemember', err);
            result(err, null);
            return;
        }

        if ((res.affectedRows == 0)) {
            // not found typemember with id
            result({ kind: 'not found' }, null);
            return;
        }
        // deleted typemember with id
        result(null, res);
    });
}

// Get items typemember
exports.getItemType_mb = (result) => {
    dbCon.query('SELECT typemember_id, typemember_name FROM tb_typemember', (err, res) => {
        if (err) {
            console.log('Error while fetching item typemember', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
exports.getMaxMemberTypeId = (result) => {
    let sql = 'SELECT MAX(typemember_id) AS id FROM tb_typemember';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching Max unit_id' + err);
            return result(err, null);
        }
        result(null, res);
    });
  }