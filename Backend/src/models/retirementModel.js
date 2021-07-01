// import connection from config
const dbCon = require('../../config/db');

// Get all member retirement from tb_member where status
exports.getAllRetire = (result) => {
    let status = 'retired' // ໝາຍເຖິງສະຖານະສະມາຊິກທີ່ົພົ້ນກະສຽນ
    let sql = 'SELECT * FROM tb_member WHERE status = ?';
    dbCon.query(sql, [status], (err, res) => {
        if (err) {
            console.log('Error while fetching retirements', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// Get data from tb_member where status = 'member' and age > 35
exports.getMemberByStatus = (result) => {
    let status = 'member';
    let age = 35;
    let sql = `SELECT M.member_id, M.member_name, M.surname, M.responsible,M.birthday,(YEAR(CURDATE())-YEAR(M.birthday)) AS age , S.sect_name, U.unit_name, F.fund_name FROM tb_section AS S 
    INNER JOIN tb_member AS M 
    ON S.sect_id = M.sect_id 
    INNER JOIN tb_unit AS U
    ON U.unit_id = S.unit_id
    INNER JOIN tb_foundation AS F
    ON F.fund_id = U.fund_id
    WHERE M.status = ? AND (YEAR(CURDATE())-YEAR(M.birthday)) >= ?`;
    dbCon.query(sql, [status, age], (err, res) => {
        if (err) {
            console.log('Error while fetching data from tb_member where status and age=' + err);
            return result(err, null);
        }
        result(null, res);
    });
}

// Get single retirement by id
exports.getRetireById = (id, result) => {
    dbCon.query('SELECT * FROM tb_retirement WHERE ');
}

// Insert new retirement to database and update status member
exports.insertRetire = (data, result) => {
    console.log(data);
    let status = 'retired';   // retired ໝາຍເຖິງສະຖານະເປັນກະສຽນ
    let sql1 = 'INSERT INTO tb_retirement (retire_NO, member_id, No_Ask, reason, date_Ask, age, date_retire) VALUES (?,?,?,?,?,?,?)';
    dbCon.query(sql1, [data.retire_NO, data.member_id, data.No_Ask, data.reason, data.date_Ask, data.age, data.date_retire], (err, res) => {
        if (err) {
            console.log('Error while inserting data to tb_retirememt!!' + err);
            return result(err, null);
        } else {
            let sql2 = 'UPDATE tb_member SET status = ? WHERE member_id = ?';
            dbCon.query(sql2, [status, data.member_id], (err, res) => {
                if (err) {
                    console.log(`Error while updating status tb_member with ID${data.member_id}` + err);
                    return result(err, null);
                }
                result(null, res);
            });
        }

    });
}

// Update retirement
exports.updateRetireById = (data, id, result) => {
    console.log(data);
    let sql = 'UPDATE tb_retirement SET retire_NO = ?, No_Ask = ?, reason = ?, date_Ask = ?, age = ?, date_retire = ? WHERE member_id = ?';
    dbCon.query(sql, [data.retire_NO, data.No_Ask, data.reason, data.date_Ask, data.age, data.date_retire, id], (err, res) => {
        if (err) {
            console.log(`Error while updating retirement with ID:${id}` + err);
            return result(err, null);
        }

        if (res.affectedRows == 0) {
            // not found
            result({ kind: 'not found' }, null);
            return;
        }
        result(null, res);
    });
}

// Delete retirement
exports.deleteRetireById = (id, result) => {
    let status = 'member'; //ໝາຍເຖິງສະຖານະກັບມາເປັນສະມາຊິກ
    let sql1 = 'DELETE FROM tb_retirement WHERE member_id = ?';
    dbCon.query(sql1, [id], (err, res) => {
        if (err) {
            console.log(`Error while deleting data from retirement with ID:${id}` + err);
            return result(err, null);
        } 

        if (res.affectedRows == 0) {
            // not found with ID
            result({ kind: 'not found' }, null);
            return;
        } else {
            let sql2 = 'UPDATE tb_member SET status = ? WHERE member_id = ?';
            dbCon.query(sql2, [status, id], (err, res) => {
                if (err) {
                    console.log(`Error while updating status tb_member with ID:${id}` + err);
                    return result(err, null);
                }
                result(null, res);
            });
        }

    });
}