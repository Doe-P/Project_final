const dbCon = require('../../config/db');

// ============> report activity from title <================
exports.repActiv_title = (id, result) => {
    try {
        let sql = `SELECT tb_member.member_name, tb_member.surname, tb_member.gender, tb_foundation.fund_name, tb_typemember.typemember_name, tb_activity.acti_title, tb_activity.place, tb_activity.date_acti FROM tb_member
        INNER JOIN tb_activity_detail ON tb_member.member_id = tb_activity_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_activity ON tb_activity.acti_id = tb_activity_detail.acti_id
        WHERE tb_activity.acti_title LIKE N? 
        GROUP BY tb_member.member_name, tb_member.surname, tb_member.gender, tb_foundation.fund_name, tb_typemember.typemember_name, tb_activity.acti_title, tb_activity.place, tb_activity.date_acti`;
        dbCon.query(sql, ['%' + id + '%'], (err, res) => {
            if (err) {
                console.log(`Error while fetching data report activity` + err);
                return result(err, null);
            }

            if (res.length) {
                // found
                return result(null, res);
            }
            result({ kind: 'not found' }, null);
        });
    } catch (error) {
        console.log(error);
    }
}

// ===========> report activity from year <=============
exports.repActiv_year = (id, result) => {
    try {
        let sql = `SELECT tb_activity.acti_title, tb_activity.place, tb_activity.date_acti,
        IFNULL(COUNT(CASE WHEN tb_member.member_id IS NOT NULL THEN 1 END),0) AS result,
        IFNULL(COUNT(CASE WHEN tb_member.gender = N'ຍິງ' THEN 1 END),0) AS women FROM tb_member
        INNER JOIN tb_activity_detail ON tb_member.member_id = tb_activity_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_activity ON tb_activity.acti_id = tb_activity_detail.acti_id
        WHERE tb_activity.date_acti LIKE N?
        GROUP BY tb_activity.acti_title, tb_activity.place, tb_activity.date_acti`;
        dbCon.query(sql, ['%' + id + '%'], (err, res) => {
            if (err) {
                console.log(`Error while fetching data report activity from year` + err);
                return result(err, null);
            }

            if (res.length) {
                // found
                return result(null, res);
            }
            result({ kind: 'not found' }, null);
        });
    } catch (error) {
        console.log(error);
    }
}