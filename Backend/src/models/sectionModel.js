// import connection from config
const dbCon = require('../../config/db');

// Get all sections
exports.getSections = (result) => {
    dbCon.query('SELECT * FROM tb_section', (err, res) => {
        if (err) {
            console.log('Error while fetching sections', err);
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
}

//  Get single section by ID
exports.getSectionById = (id, result) => {
    dbCon.query('SELECT * FROM tb_section WHERE sect_id = ?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching section by id', err);
            result(err, null);
            return;
        }

        if (res.length) {
            // found section
            console.log('found section');
            // result(null, res[0]);  // res[0] ໝາຍເຖິງຕັດ Array ອອກ
            result(null, res);
            return;
        }
        // not found section with the id
        result({ kind: 'not found' }, null);
    });
}

// Insert new section to database
exports.insertSection = (data, result) => {
    dbCon.query('INSERT INTO tb_section SET ?', [data], (err, res) => {
        if (err) {
            console.log('Error while inserting section', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// Update section to database
exports.updateSectionById = (data, id, result) => {
    const sql = 'UPDATE tb_section SET sect_name = ?, unit_id =?, date_sect = ?, status_sect = ? WHERE sect_id =?';
    dbCon.query(sql, [data.sect_name, data.unit_id, data.date_sect, data.status_sect, id], (err, res) => {
        if (err) {
            console.log('Error while updating the section', err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found section with the id
            result({ king: 'not found' }, null);
            return;
        }
        result(null, res);
    });
}

// Delete data from section 
exports.deleteSectionById = (id, result) => {
    dbCon.query('DELETE FROM tb_section WHERE sect_id =?', [id], (err, res) => {
        if (err) {
            console.log('Errror while deleting the section ==>', err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found section with the id
            result({kind: 'not found'}, null);
            return;
        }
        // deleted section with id
        result(null, res);
    });
}
// Get largest column foundation ID
exports.getMaxSectId = (result) => {
    let sql = 'SELECT MAX(sect_id) AS id FROM tb_section';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching Max unit_id' + err);
            return result(err, null);
        }
        result(null, res);
    });
  }