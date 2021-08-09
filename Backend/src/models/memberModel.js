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
    let sql = 'SELECT tb_member.member_id,tb_member.member_name,tb_member.surname,tb_member.responsible,tb_member.gender,tb_educationlevel.level_name,tb_member.date_Y,tb_member.date_start,tb_typemember.typemember,tb_section.sect_name,tb_unit.unit_name,tb_foundation.fund_id,tb_foundation.fund_name,tb_member.status FROM tb_member INNER JOIN tb_educationlevel ON tb_member.level_id=tb_educationlevel.level_id INNER JOIN tb_typemember ON tb_member.typemember_id=tb_typemember.typemember_id INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching tb_member==>' + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}


// Get all member by status
exports.getMemberBystatus = (result) => {
    let sql = 'SELECT tb_member.member_id,tb_member.member_name,tb_member.surname,tb_member.responsible,tb_member.gender,tb_educationlevel.level_name,tb_member.date_Y,tb_member.date_start,tb_typemember.typemember,tb_section.sect_name,tb_unit.unit_name,tb_foundation.fund_id,tb_foundation.fund_name,tb_member.status FROM tb_member INNER JOIN tb_educationlevel ON tb_member.level_id=tb_educationlevel.level_id INNER JOIN tb_typemember ON tb_member.typemember_id=tb_typemember.typemember_id INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id WHERE tb_member.status=?';
    dbCon.query(sql,['ສະມາຊິກ'], (err, res) => {
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
    let sql = 'SELECT tb_member.member_id,tb_member.member_name,tb_member.surname,tb_member.gender,tb_member.birthday, tb_member.bvillage,tb_member.bdistrict,tb_member.bprovince,tb_member.nvillage,tb_member.ndistrict,tb_member.nprovince,tb_member.nation,tb_member.ethnic,tb_member.religion,tb_member.tell,tb_member.date_Y,tb_member.date_W,tb_member.date_K,tb_member.date_PS,tb_member.date_P,tb_member.date_start,tb_foundation.fund_id,tb_unit.unit_id,tb_member.sect_id,tb_section.sect_name,tb_member.typemember_id,tb_member.level_id,tb_member.responsible,tb_member.language,tb_member.blood,tb_member.status FROM tb_member INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id WHERE tb_member.member_id=?';
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
// Get member by foundation
exports.getMemberByfound = (id, result) => {
    let sql = 'SELECT tb_member.member_id,tb_member.member_name,tb_member.surname,tb_member.gender,tb_educationlevel.level_name,tb_member.date_Y,tb_member.date_start,tb_typemember.typemember,tb_section.sect_name,tb_unit.unit_name,tb_foundation.fund_id,tb_foundation.fund_name,tb_member.status FROM tb_member INNER JOIN tb_educationlevel ON tb_member.level_id=tb_educationlevel.level_id INNER JOIN tb_typemember ON tb_member.typemember_id=tb_typemember.typemember_id INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id WHERE tb_foundation.fund_id=?';
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
// count all member
exports.CountAllmemberclient = (fund_id,result) => {
    let sql = `SELECT COUNT(*) AS count_member 
    FROM tb_member 
    INNER JOIN tb_section ON tb_member.sect_id = tb_section.sect_id 
    INNER JOIN tb_unit ON tb_section.unit_id = tb_unit.unit_id 
    INNER JOIN tb_foundation ON tb_unit.fund_id = tb_foundation.fund_id 
    WHERE tb_member.status LIKE N'ສະມາຊິກ' AND tb_foundation.fund_id=?`;
    dbCon.query(sql,[fund_id], (err, res) => {
        if (err) {
            console.log('Error while fetching tb_member==>' + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
// count female member
exports.Countfemalemember = (result) => {
    const gender ='ຍິງ';
    let sql = 'SELECT COUNT(member_id) AS count_member FROM tb_member WHERE gender=?';
    dbCon.query(sql,[gender], (err, res) => {
        if (err) {
            console.log('Error while fetching tb_member==>' + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
// count retirement member
exports.CountRetiremember = (result) => {
    const status ='ພົ້ນກະສຽນ';
    let sql = 'SELECT COUNT(member_id) AS count_member FROM tb_member WHERE status=?';
    dbCon.query(sql,[status], (err, res) => {
        if (err) {
            console.log('Error while fetching tb_member==>' + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
// count move member
exports.CountMovemember = (result) => {
    const status ='ຍົກຍ້າຍ';
    let sql = 'SELECT COUNT(member_id) AS count_member FROM tb_member WHERE status=?';
    dbCon.query(sql,[status], (err, res) => {
        if (err) {
            console.log('Error while fetching tb_member==>' + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// count member
exports.CountMembers = (result) => {
    let sql = `SELECT
     (SELECT COUNT(*) FROM tb_member WHERE status LIKE N'ສະມາຊິກ') AS members,
      (SELECT COUNT(*) FROM tb_member WHERE status LIKE N'ສະມາຊິກ' AND gender='ຍິງ') AS women,
       (SELECT COUNT(*) FROM tb_member WHERE status LIKE N'ຍົກຍ້າຍ') AS move, 
       (SELECT COUNT(*) FROM tb_member WHERE status LIKE N'ພົ້ນກະສຽນ') AS retire
        FROM tb_member`;
    dbCon.query(sql,(err, res) => {
        if (err) {
            console.log('Error while fetching tb_member==>' + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

