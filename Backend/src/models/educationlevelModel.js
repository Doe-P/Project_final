// import connection from config
const dbCon = require('../../config/db');

// Get all educations_Level
exports.getEducationLevel = (result) => {
    dbCon.query('SELECT * FROM tb_educationlevel', (err, res) => {
        if (err) {
            console.log('Error while fetching educations', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// Get single educationlevel by id
exports.getEducationlevelById = (id, result) => {
    dbCon.query('SELECT * FROM tb_educationlevel WHERE level_id = ?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching educationlevel with the id ==>', err);
            result(err, null);
            return;
        }

        if (res.length) {
            // found educationlevel
            console.log('found educationlevel');
            result(null, res);
            return;
        }
        // not found educationlevel with the id
        result({ kind: 'not found' }, null);
    });
}

// Insert new educationlevel to database
exports.insertEducationLevel = (data, result) => {
    dbCon.query('INSERT INTO tb_educationlevel SET ?', [data], (err, res) => {
        if (err) {
            console.log('Error while inserting educationlevel', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// Update educationlevel to database
exports.updateEducationLevelById = (data, id, result) => {
    dbCon.query('UPDATE tb_educationlevel SET level_name = ? WHERE level_id = ?', [data.level_name, id], (err, res) => {
        if (err) {
            console.log('Error while updating the educationlevel', err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found educationlevel with the id
            result({ kind: 'not found' }, null);
            return;
        }
        // found educationlevel with id
        result(null, res);
    });
}

// Delete educationlevel from database
exports.deleteEducationLevelById = (id, result) => {
    dbCon.query('DELETE FROM tb_educationlevel WHERE level_id = ?', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting the educationlevel ==>', err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found educationlevel with the id
            result({ kind: 'not found' }, null);
            return;
        }
        // deleted educationlevel with the id
        result(null, res);
    });
}

// Get items
exports.getItemsEduc = (result) => {
    dbCon.query('SELECT level_id, level_name FROM tb_educationlevel', (err, res) => {
        if (err) {
            console.log('Error while fetching field level_name from educationlevel', err);
            result(err, null);
            return;
        } 
        result(null, res);   
    });
}