const dbCon = require('../../config/db');

// ===============> report receive money where year <===================
exports.repReceive_year = (id, result) => {
    try {
        let sql = `SELECT tb_receive_money.receive_id, tb_receive_money.recive_NO, tb_foundation.fund_name, tb_receive_money.quarterly,
        tb_receive_money.year, tb_receive_money.money_total, tb_receive_money.date,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ນັກສຶກສາ' OR tb_typemember.typemember = N'ນັກຮຽນ' THEN 1 END),0) AS student,
        IFNULL(COUNT(CASE WHEN(tb_typemember.typemember = N'ນັກສຶກສາ' OR tb_typemember.typemember = N'ນັກຮຽນ') AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS student_W,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ນັກສຶກສາ' OR tb_typemember.typemember = N'ນັກຮຽນ' THEN 1 END),0) * (SELECT money FROM tb_typemember WHERE tb_typemember.typemember = N'ນັກສຶກສາ') AS student_Mn,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ອາຈານ' THEN 1 END),0) * (SELECT money FROM tb_typemember WHERE tb_typemember.typemember = N'ພະນັກງານຄູອາຈານ') AS teacher_Mn,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ອາຈານ' THEN 1 END),0) AS teacher,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ອາຈານ' AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS teacher_W, tb_receive_detail.amount_month FROM tb_member
        INNER JOIN tb_receive_detail ON tb_member.member_id = tb_receive_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_receive_money ON tb_receive_money.receive_id = tb_receive_detail.receive_id
        WHERE tb_receive_money.year = ?
        GROUP BY tb_receive_money.receive_id, tb_receive_money.recive_NO, tb_foundation.fund_name, tb_receive_money.quarterly, tb_receive_detail.amount_month, tb_receive_money.year,
        tb_receive_money.money_total, tb_receive_money.date`;
        dbCon.query(sql,[id], (err, res) => {
            if (err) {
                console.log(`Error while fetching data report receive money where year` + err);
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

// ==============> report receive money <================
exports.repReceive_all = (result) => {
    try {
        let sql = `SELECT tb_receive_money.receive_id, tb_receive_money.recive_NO, tb_foundation.fund_name, tb_receive_money.quarterly,
        tb_receive_money.year, tb_receive_money.money_total, tb_receive_money.date,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ນັກສຶກສາ' OR tb_typemember.typemember = N'ນັກຮຽນ' THEN 1 END),0) AS student,
        IFNULL(COUNT(CASE WHEN(tb_typemember.typemember = N'ນັກສຶກສາ' OR tb_typemember.typemember = N'ນັກຮຽນ') AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS student_W,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ນັກສຶກສາ' OR tb_typemember.typemember = N'ນັກຮຽນ' THEN 1 END),0) * (SELECT money FROM tb_typemember WHERE tb_typemember.typemember = N'ນັກສຶກສາ') AS student_Mn,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ອາຈານ' THEN 1 END),0) * (SELECT money FROM tb_typemember WHERE tb_typemember.typemember = N'ພະນັກງານຄູອາຈານ') AS teacher_Mn,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ອາຈານ' THEN 1 END),0) AS teacher,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ອາຈານ' AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS teacher_W, tb_receive_detail.amount_month FROM tb_member
        INNER JOIN tb_receive_detail ON tb_member.member_id = tb_receive_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_receive_money ON tb_receive_money.receive_id = tb_receive_detail.receive_id
        GROUP BY tb_receive_money.receive_id, tb_receive_money.recive_NO, tb_foundation.fund_name, tb_receive_money.quarterly, tb_receive_detail.amount_month,  tb_receive_money.year,
        tb_receive_money.money_total, tb_receive_money.date`;
        dbCon.query(sql, (err, res) => {
            if (err) {
                console.log('Error while fetching data');
                return result(err, null);
            }
            result(null, res);
        });
    } catch (error) {
        console.log(error);
    }
}

// =============> report invoice <==================
exports.repBill_fundID = (id, result) => {
    try {
        let sql = `SELECT  tb_receive_money.receive_id, tb_receive_money.recive_NO, tb_foundation.fund_name, tb_receive_money.quarterly, tb_receive_money.year, tb_receive_money.money_total, tb_receive_money.date,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ນັກສຶກສາ' OR tb_typemember.typemember = N'ນັກຮຽນ' THEN 1 END),0) AS student,
        IFNULL(COUNT(CASE WHEN(tb_typemember.typemember = N'ນັກສຶກສາ' OR tb_typemember.typemember = N'ນັກຮຽນ') AND tb_member.gender = N'ຍິງ' THEN 1 end),0) AS student_W,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ນັກສຶກສາ' OR tb_typemember.typemember = N'ນັກຮຽນ' THEN 1 END),0) * (SELECT money FROM tb_typemember WHERE tb_typemember.typemember = N'ນັກສຶກສາ') AS student_Mn,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ພະນັກງານຄູອາຈານ' OR tb_typemember.typemember = N'ອາຈານ'THEN 1 END),0) * (SELECT money FROM tb_typemember WHERE tb_typemember.typemember = N'ພະນັກງານຄູອາຈານ') AS teacher_Mn,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ພະນັກງານຄູອາຈານ' OR tb_typemember.typemember = N'ອາຈານ'THEN 1 END),0) AS teacher,
        IFNULL(COUNT(CASE WHEN(tb_typemember.typemember = N'ພະນັກງານຄູອາຈານ' OR tb_typemember.typemember = N'ອາຈານ') AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS teacher_W, tb_receive_detail.amount_month FROM tb_member
        INNER JOIN tb_receive_detail ON tb_member.member_id = tb_receive_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_receive_money ON tb_receive_money.receive_id = tb_receive_detail.receive_id
        WHERE tb_foundation.fund_id = ?
        GROUP BY tb_receive_money.receive_id, tb_receive_money.recive_NO, tb_foundation.fund_name, tb_receive_money.quarterly, tb_receive_money.year, tb_receive_money.money_total, tb_receive_money.date`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`Error while fetching data report Invoice where fund_ID` + err);
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