// import connection from config
const dbCon = require('../../config/db');

// Get all unit
exports.getUnit = (result) => {
    const sql = 'SELECT tb_unit.unit_id, tb_unit.unit_name, tb_foundation.fund_name, tb_unit.date_unit, tb_unit.status_unit FROM tb_unit INNER JOIN tb_foundation ON tb_unit.fund_id = tb_foundation.fund_id';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching unit', err);
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
}

// Get single unit
exports.getUnitById = (id, result) => {
    const sql = 'SELECT tb_unit.unit_id, tb_unit.unit_name, tb_foundation.fund_name, tb_unit.date_unit, tb_unit.status_unit FROM tb_unit INNER JOIN tb_foundation ON tb_unit.fund_id = tb_foundation.fund_id WHERE unit_id = ?';
    dbCon.query(sql, [id], (err, res) => {
        if (err) {
            console.log('Error while fetching unit by id', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found unit');
            // result(null, res[0]);  // res[0] ໝາຍເຖິງຕັດ Array ອອກ
            result(null, res);
            return;
        }

        // not found unit with the id
        result({ kind: 'not found' }, null);
    });
}

// Insert unit to database
exports.insertUnit = (data, result) => {
    dbCon.query('INSERT INTO tb_unit SET ?', [data], (err, res) => {
        if (err) {
            console.log('Error while inserting data', err);
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
}

// Update unit to database
exports.updateUnitById = (data, id, result) => {
    const sql = 'UPDATE tb_unit SET unit_name = ?, fund_id = ?, date_unit = ?, status_unit = ? WHERE unit_id = ?';
    dbCon.query(sql, [data.unit_name, data.fund_id, data.date_unit, data.status_unit, id], (err, res) => {
        if (err) {
            console.log('Error while updating the unit', err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found unit with the id
            result({ kind: 'not found' }, null);
            return;
        }
        result(null, res);
    });
}

// Delete data from unit
exports.deleteUnitById = (id, result) => {
    dbCon.query('DELETE FROM tb_unit WHERE unit_id = ?', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting the unit');
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found unit with the id
            result({ kind: 'not found' }, null);
            return;
        }
        // deleted unit with the id
        result(null, res);
    });
}

// get Item 
exports.getItemUnit = (id, result) => {
    dbCon.query('SELECT unit_id, unit_name FROM tb_unit WHERE fund_id = ?', [id], (err, res) => {
        if (err) {
            console.log('Error while get item unit:', err);
            result(err, null);
            return;
        }

        if (res.length) {
            // found Item units
            result(null, res);
            return;
        }
        // not found Item unit
        result({ kind: 'not found' }, null);    
    });
}