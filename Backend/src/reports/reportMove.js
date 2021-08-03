const dbCon = require('../../config/db');

// ============> report move from move_NO <================
exports.repMove_moveNO = (id, result) => {
    let cdt_ID1 = id;
    try {
        let sql = `SELECT tb_member.member_name, tb_member.surname, tb_member.gender, tb_section.sect_name, tb_unit.unit_name, tb_foundation.fund_name, tb_typemember.typemember, tb_member.responsible, tb_move.move_NO,tb_move.reason, tb_move.reason, tb_move.m_Year, tb_move.date_move, (SELECT COUNT(*) FROM tb_member
        INNER JOIN tb_move_detail ON tb_member.member_id = tb_move_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_move ON tb_move.move_id = tb_move_detail.move_id
        WHERE tb_member.gender = N'ຍິງ' AND tb_move.move_NO = ?) AS women 
        FROM tb_member
        INNER JOIN tb_move_detail ON tb_member.member_id = tb_move_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_move ON tb_move.move_id = tb_move_detail.move_id
        WHERE tb_move.move_NO = ?`;
        dbCon.query(sql, [cdt_ID1, id], (err, res) => {
            if (err) {
                console.log(`Error while fetching count women and data move member with${id}` + err);
                return result(err, null);
            }

            if (res.length) {
                // found
                return result(null, res);
            }
            // not found
            result({ kind: 'not found' }, null);
        });
    } catch (error) {
        console.log(error);
    }
}

// ============> report Move from year <=============
exports.repMove_year = (id, result) => {
    console.log(id);
    try {
        let sql = `SELECT tb_foundation.fund_name, tb_move.m_Year,
        IFNULL(COUNT(CASE WHEN tb_move_detail.member_id IS NOT NULL THEN 1 END),0) AS result,
        IFNULL(COUNT(CASE WHEN tb_move_detail.member_id IS NOT NULL AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS women
        FROM tb_member
        INNER JOIN tb_move_detail ON tb_member.member_id = tb_move_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_move ON tb_move.move_id = tb_move_detail.move_id
        WHERE tb_move.m_Year = N?
        GROUP BY tb_foundation.fund_name, tb_move.m_Year`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`Error while fetching count result and women with year with${id}` + err);
                return result(err, null);
            }

            if (res.length) {
                // found
                return result(null, res);
            }
            // not found
            result({ kind: 'not found' }, null);
        });
    } catch (error) {
        console.log(error);
    }
}

// ============> report move from move_NO <================
exports.get_moveNO = (fund_id,year,result) => {
    try {
        let sql = `SELECT tb_move.move_NO FROM tb_move 
        INNER JOIN tb_move_detail ON tb_move.move_id = tb_move_detail.move_id 
        INNER JOIN tb_member ON tb_move_detail.member_id = tb_member.member_id 
        INNER JOIN tb_section ON tb_member.sect_id = tb_section.sect_id 
        INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id 
        INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id
        WHERE tb_foundation.fund_id=? AND tb_move.m_Year=?
         GROUP BY tb_move.move_NO`;
        dbCon.query(sql,[fund_id,year],(err, res) => {
            if (err) {
                console.log(`Error while fetching  data move NO ` + err);
                return result(err, null);
            }

            if (res.length) {
                // found
                return result(null, res);
            }
            // not found
            result({ kind: 'not found' }, null);
        });
    } catch (error) {
        console.log(error);
    }
}

exports.repMove_member = (id, result) => {
    let cdt_ID1 = id;
    try {
        let sql = `SELECT tb_move.move_NO,tb_member.member_name,tb_member.surname,tb_member.birthday,tb_member.bvillage,tb_member.bdistrict,tb_member.bprovince,tb_member.nvillage,tb_member.ndistrict,tb_member.nprovince,tb_member.nation,tb_member.ethnic,tb_member.religion,tb_member.date_Y,tb_member.responsible,tb_foundation.fund_name,tb_move.reason,tb_move.m_Year 
        FROM tb_move_detail 
        INNER JOIN tb_move ON tb_move_detail.move_id=tb_move.move_id 
        INNER JOIN tb_member ON tb_move_detail.member_id=tb_member.member_id 
        INNER JOIN tb_section ON tb_member.sect_id = tb_section.sect_id 
        INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id 
        INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id 
        WHERE tb_move_detail.move_id =?`;
        dbCon.query(sql, [cdt_ID1, id], (err, res) => {
            if (err) {
                console.log(`Error while fetching count women and data move member with${id}` + err);
                return result(err, null);
            }

            if (res.length) {
                // found
                return result(null, res);
            }
            // not found
            result({ kind: 'not found' }, null);
        });
    } catch (error) {
        console.log(error);
    }
}