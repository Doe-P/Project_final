const dbCon = require('../../config/db');

// Create new member to database
exports.insertMember = (data, result) => {
    //console.log(data);
    console.log(data.sect_id);
    console.log(data.level_id);
    let sql = 'INSERT INTO tb_member(member_id, member_name, surname, gender, birthday, bvillage, bdistrict, bprovince, nvillage, ndistrict, nprovince, nation, ethnic, religion, tell, date_Y, date_W, date_K, date_PS, date_P, sect_id, typemember_id, level_id, responsible, language, blood, date_start, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    dbCon.query(sql, [data.member_id, data.member_name, data.surname, data.gender, data.birthday, data.bvillage, data.bdistrict, data.bprovince, data.nvillage, data.ndistrict, data.nprovince, data.nation, data.ethnic, data.religion, data.tell, data.date_Y, data.date_W, data.date_K, data.date_PS, data.date_P, data.sect_id, data.typemember_id, data.level_id, data.responsible, data.language, data.blood, data.date_start, data.status], (err, res) => {
        if (err) {
            console.log('Error while inserting data to tb_member==>' + err);
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
}

// Update member by id
exports.updateMemberById = (data, id, result) => {
    let sql = 'UPDATE tb_member SET member_name = ?, surname = ?, gender = ?, birthday = ?, bvillage = ?, bdistrict = ?, bprovince = ?, nvillage = ?, ndistrict = ?, nprovince = ?, nation = ?, ethnic = ?, religion = ?, tell = ?, date_Y = ?, date_W = ?, date_K = ?, date_PS = ?, date_P = ?, sect_id = ?, typemember_id = ?, level_id = ?, responsible = ?, language = ?, blood = ?, date_start = ?, status = ? WHERE member_id = ?';
    dbCon.query(sql, [data.member_name, data.surname, data.gender, data.birthday, data.bvillage, data.bdistrict, data.bprovince, data.nvillage, data.ndistrict, data.nprovince, data.nation, data.ethnic, data.religion, data.tell, data.date_Y, data.date_W, data.date_K, data.date_PS, data.date_P, data.sect_id, data.typemember_id, data.level_id, data.responsible, data.language, data.blood, data.date_start, data.status, id], (err, res) => {
        if (err) {
            console.log(`Error while updating member with id ${id} ==>` + err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found member with id
            result({ kind: 'not found' })
            return;
        }
        result(null, res);
    })
}

// Delete member by id
exports.deleteMemberById = (id, result) => {
    let sql = 'DELETE FROM tb_member WHERE member_id = ?';
    dbCon.query(sql, [id], (err, res) => {
        if (err) {
            console.log(`Error while deleting member with ID ${id}==>` + err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found member with ID
            result({kind:'not found'}, null);
            return;
        }
        result(null, res);
    });
}

// Get Largest column member ID
exports.getMaxMemberId = (result) => {
    let sql = 'SELECT MAX(member_id) AS id FROM tb_member';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching Max member ID');
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// Get all member
exports.getMember = (result) => {
    let sql = 'SELECT * FROM tb_member';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching tb_member==>' + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// Get single member
exports.getMemberById = (id, result) => {
    let sql = 'SELECT * FROM tb_member WHERE member_id = ?';
    dbCon.query(sql, [id], (err, res) => {
        if (err) {
            console.log(`Error while fetching member by id:${id}` + err);
            result(err, null);
            return;
        }

        if (res.length) {
            // found member with id
            console.log('found member');
            result(null, res);
            return;
        }

        // not found member with id
        result({ kind: 'not found' }, null);
    });
}