const dbCon = require('../../config/db');

// =================> report member retirement for year <======================
exports.repRetire_Year = (year, id, result) => {
    let year1 = year;
    let year2 = year;
    let ft1_ID = id;
    let ft2_ID = id;
    try {
        let sql = `SELECT tb_retirement.NO_Ask, tb_member.member_name, tb_member.surname, tb_member.gender, tb_typemember.typemember, tb_section.sect_name, tb_unit.unit_name, tb_foundation.fund_name, tb_member.responsible,tb_retirement.reason, tb_retirement.date_retire, 
        (SELECT COUNT(*) FROM tb_member
        INNER JOIN tb_retirement ON tb_member.member_id = tb_retirement.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        WHERE tb_member.status = N'ພົ້ນກະສຽນ' AND tb_member.gender = N'ຍິງ' 
        AND tb_retirement.date_retire LIKE ? AND tb_foundation.fund_id = ? ) AS women,
        (SELECT COUNT(*) FROM tb_member
        INNER JOIN tb_retirement ON tb_member.member_id = tb_retirement.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id 
        WHERE tb_member.status = N'ພົ້ນກະສຽນ' 
        AND tb_retirement.date_retire LIKE  ? AND tb_foundation.fund_id = ?) AS result
        FROM tb_member
        INNER JOIN tb_retirement ON tb_member.member_id = tb_retirement.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        WHERE tb_member.status = N'ພົ້ນກະສຽນ'  
        AND tb_retirement.date_retire LIKE  ? AND tb_foundation.fund_id = ?`;
        dbCon.query(sql, ['%' + year1 + '%', ft1_ID, '%' + year2 + '%', ft2_ID, '%' + year + '%', id], (err, res) => {
            if (err) {
                console.log(`Error while fetching count women and result and data member section with${id}` + err);
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

// !==================> report qty all member and female retirement <====================
exports.repRetireBetween_Year = (cdt1_y, cdt2_y, result) => {
    try {
        let sql = `SELECT tb_foundation.fund_name, IFNULL(COUNT(CASE WHEN tb_retirement.member_id IS NOT NULL THEN 1 END),0) AS total,
        IFNULL(COUNT(CASE WHEN tb_retirement.member_id IS NOT NULL AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS women
        FROM tb_member 
        INNER JOIN tb_retirement ON tb_member.member_id = tb_retirement.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        WHERE(tb_retirement.date_retire >= N? AND tb_retirement.date_retire <= N?)
        GROUP BY tb_foundation.fund_name`;
        dbCon.query(sql, [cdt1_y, cdt2_y], (err, res) => {
            if (err) {
                console.log(`error while fetching data`);
                return result(err, null);
            }
            result(null, res);
        });
    } catch (error) {
        console.log(error);
    }
}