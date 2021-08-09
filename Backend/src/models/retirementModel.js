// import connection from config
const dbCon = require('../../config/db');

// Get all member retirement from tb_member 
exports.getAllRetire = (result) => {
    //let status = 'retired' // ໝາຍເຖິງສະຖານະສະມາຊິກທີ່ົພົ້ນກະສຽນ
    let sql = 'SELECT tb_retirement.retire_id,tb_retirement.No_Ask,tb_retirement.member_id,tb_retirement.reason,tb_retirement.portfolio,tb_retirement.date_Ask,tb_retirement.age,tb_retirement.date_retire,tb_typemember.typemember,tb_member.member_name,tb_member.surname,tb_member.gender,tb_section.sect_name,tb_unit.unit_name,tb_foundation.fund_name,tb_foundation.fund_id FROM tb_retirement INNER JOIN tb_member ON tb_retirement.member_id=tb_member.member_id INNER JOIN tb_typemember ON tb_member.typemember_id=tb_typemember.typemember_id INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching retirements', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// Get all member retirement from tb_member where status
exports.getAllRetire_byFoundation = (id,result) => {
    //let status = 'retired' // ໝາຍເຖິງສະຖານະສະມາຊິກທີ່ົພົ້ນກະສຽນ
    let sql = `SELECT tb_retirement.retire_id,tb_retirement.No_Ask,tb_retirement.member_id,tb_retirement.reason,tb_retirement.portfolio,tb_retirement.date_Ask,tb_retirement.age,tb_retirement.date_retire,tb_typemember.typemember,tb_member.member_name,tb_member.surname,tb_member.gender,tb_section.sect_name,tb_unit.unit_name,tb_foundation.fund_name
     FROM tb_retirement 
     INNER JOIN tb_member ON tb_retirement.member_id=tb_member.member_id 
     INNER JOIN tb_typemember ON tb_member.typemember_id=tb_typemember.typemember_id 
     INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id 
     INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id 
     INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id
      WHERE tb_foundation.fund_id=?`;
    dbCon.query(sql,[id], (err, res) => {
        if (err) {
            console.log('Error while fetching retirements', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// Get data from tb_member where status = 'member' and age > 35 for admin
exports.getMemberByStatus = (result) => {
    let status = 'ສະມາຊິກ';
    let age = 35;
    let sql = `SELECT M.member_id, M.member_name, M.surname,M.gender, M.responsible,M.birthday,(YEAR(CURDATE())-YEAR(M.birthday)) AS age , S.sect_name, U.unit_name, F.fund_name FROM tb_section AS S 
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

// Get data from tb_member where fund_name and status and age >= 35
exports.getMemberByStatus_client = (id, result) => {
    try {
        let status = 'ສະມາຊິກ';
    let age = 35;
    let sql = `SELECT M.member_id, M.member_name, M.surname, M.responsible,M.birthday,(YEAR(CURDATE())-YEAR(M.birthday)) AS age , S.sect_name, U.unit_name, F.fund_name FROM tb_section AS S 
    INNER JOIN tb_member AS M 
    ON S.sect_id = M.sect_id 
    INNER JOIN tb_unit AS U
    ON U.unit_id = S.unit_id
    INNER JOIN tb_foundation AS F
    ON F.fund_id = U.fund_id
    WHERE  M.status = ? AND (YEAR(CURDATE())-YEAR(M.birthday)) >= ? AND F.fund_id = ?`;
    dbCon.query(sql, [status, age, id], (err, res) => {
        if (err) {
            console.log('Error while fetching data from tb_member where status and age=' + err);
            return result(err, null);
        }
        
        if (res.length) {
            // found
            return  result(null, res);
        }
        // not found
        result({kind: 'not found'}, null);
    });
    } catch (error) {
        console.log(error);
    }
}

// Get single retirement by id
exports.getRetireById = (id, result) => {
    dbCon.query('SELECT tb_retirement.member_id,tb_retirement.No_Ask,tb_retirement.reason,tb_retirement.portfolio,tb_retirement.date_Ask,tb_retirement.date_retire,tb_member.member_name,tb_member.surname FROM tb_retirement INNER JOIN tb_member ON tb_retirement.member_id=tb_member.member_id WHERE tb_retirement.retire_id=?',[id],(err,res)=>{
       if(err){
        console.log('Error can not get data on tb_retirememt!!' + err);
        return result(err, null);
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

// Insert new retirement to database and update status member
exports.insertRetire = (data, result) => {
    console.log(data);
    let status = 'ພົ້ນກະສຽນ';   // retired ໝາຍເຖິງສະຖານະເປັນກະສຽນ
    let sql1 = 'INSERT INTO tb_retirement (retire_id, member_id, No_Ask, reason,portfolio, date_Ask, age, date_retire) VALUES (?,?,?,?,?,?,?,?)';
    dbCon.query(sql1, [data.retire_id, data.member_id, data.No_Ask, data.reason,data.portfolio, data.date_Ask, data.age, data.date_retire], (err, res) => {
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
    let sql = 'UPDATE tb_retirement SET  No_Ask = ?, reason = ?,portfolio=?, date_Ask = ?, date_retire = ? WHERE retire_id = ?';
    dbCon.query(sql, [ data.No_Ask, data.reason,data.portfolio, data.date_Ask,data.date_retire, id], (err, res) => {
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
exports.getMaxRetireId = (result) => {
    let sql = 'SELECT MAX(retire_id) AS id FROM tb_retirement';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching Max retire_id' + err);
            return result(err, null);
        }
        result(null, res);
    });
  }

  // count all member
exports.CountAllmember_retire = (result) => {
    let sql = 'SELECT COUNT(retire_id) AS count_member FROM tb_retirement';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching tb_retirement==>' + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
// count female member
exports.Countfemalemember_retire = (result) => {
    const gender ='ຍິງ';
    let sql = 'SELECT COUNT(tb_retirement.retire_id) AS count_member FROM tb_retirement INNER JOIN tb_member ON tb_retirement.member_id=tb_member.member_id WHERE tb_member.gender=?';
    dbCon.query(sql,[gender], (err, res) => {
        if (err) {
            console.log('Error while fetching tb_retirement==>' + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}