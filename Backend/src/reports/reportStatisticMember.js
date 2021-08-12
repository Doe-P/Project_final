  
const dbCon = require('../../config/db');

// ===========> report foundations <===============
exports.repFoundation = (result) => {
    try {
        let sql = `SELECT tb_foundation.fund_name, IFNULL(COUNT(CASE WHEN tb_unit.status_unit = N'ບັນຈຸ' THEN 1 END),0) AS units,
        IFNULL(COUNT(CASE WHEN tb_section.status_sect = N'ບັນຈຸ' THEN 1 END),0) AS sections FROM tb_section
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        GROUP BY tb_foundation.fund_name`;
        dbCon.query(sql, (err, res) => {
            if (err) {
                console.log(`Error while fetching data foundation`);
                return result(err, null);
            }
            result(null, res);
        });
    } catch (error) {
        console.log(error);
    }
}

// ==================> report member statistic 6ເດືອນທ້າຍປີຕົ້ນປີ Where date<===================
exports.repMemberStatis_start_last = (d_start, d_end, result) => {
    let date_start1 = d_start;
    let date_start2 = d_start;
    let date_start3 = d_start;
    let date_start4 = d_start;
    let date_end1 = d_end;
    let date_end2 = d_end;
    let date_end3 = d_end;
    let date_end4 = d_end;
    try {
        let sql = `SELECT tb_foundation.fund_name, 
        IFNULL(COUNT(CASE WHEN tb_member.date_Y IS NOT NULL THEN 1 END),0) AS Allyouth,
        IFNULL(COUNT(CASE WHEN tb_member.date_Y IS NOT NULL AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS W_youth,
        IFNULL(COUNT(CASE WHEN tb_member.date_K IS NOT NULL THEN 1 END),0) AS Kummaban,
        IFNULL(COUNT(CASE WHEN tb_member.date_K IS NOT NULL AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS W_kummaban,
        IFNULL(COUNT(CASE WHEN tb_member.date_W IS NOT NULL THEN 1 END),0) AS allwomen,
        IFNULL(COUNT(CASE WHEN tb_member.date_P IS NOT NULL THEN 1 END),0) AS phuk,
        IFNULL(COUNT(CASE WHEN tb_member.date_P IS NOT NULL AND tb_member.gender =  N'ຍິງ' THEN 1 END),0) AS W_phuk,
        IFNULL(COUNT(CASE WHEN tb_member.status = N'ຖືກວິໄນ' THEN 1 END),0) AS Note_out,
        IFNULL(COUNT(CASE WHEN tb_member.status = N'ຖືກວິໄນ' AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS W_note_out,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ນັກຮຽນ' THEN 1 END),0) AS allStudent,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ນັກຮຽນ' AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS W_student,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ນັກສຶກສາ' THEN 1 END),0) AS nuksueksa,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember =  N'ນັກສຶກສາ' AND tb_member.gender = N'ຍິງ'  THEN 1 END),0) AS W_nuksueksa,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember = N'ພະນັກງານຄູອາຈານ'  THEN 1 END),0) AS teacher,
        IFNULL(COUNT(CASE WHEN tb_typemember.typemember =  N'ພະນັກງານຄູອາຈານ' AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS W_teacher,
        IFNULL(COUNT(CASE WHEN tb_educationlevel.level_name = N'ປະຣິນຍາເອກ' THEN 1 END),0) AS paliyaAek,
        IFNULL(COUNT(CASE WHEN tb_educationlevel.level_name = N'ປະຣິນຍາເອກ' AND tb_member.gender = N'ຍິງ'  THEN 1 END),0) AS W_paliyaAek,
        IFNULL(COUNT(CASE WHEN tb_educationlevel.level_name = N'ປະຣິນຍາໂທ' THEN 1 END),0) AS paliyatho,
        IFNULL(COUNT(CASE WHEN tb_educationlevel.level_name =N'ປະຣິນຍາໂທ' AND tb_member.gender = N'ຍິງ'  THEN 1 END),0) AS W_paliyatho,
        IFNULL(COUNT(CASE WHEN tb_educationlevel.level_name = N'ປະຣິນຍາຕີ' THEN 1 END),0) AS paliyaty,
        IFNULL(COUNT(CASE WHEN tb_educationlevel.level_name = N'ປະຣິນຍາຕີ' AND tb_member.gender = N'ຍິງ'  THEN 1 END),0) AS W_paliyaty,
        IFNULL(COUNT(CASE WHEN tb_educationlevel.level_name NOT LIKE N'ປະຣິນຍາຕີ' AND tb_educationlevel.level_name NOT LIKE N'ປະຣິນຍາໂທ' AND tb_educationlevel.level_name NOT LIKE N'ປະຣິນຍາເອກ' THEN 1 END),0) AS levelOther,
        IFNULL(COUNT(CASE WHEN tb_educationlevel.level_name NOT LIKE N'ປະຣິນຍາຕີ' AND tb_educationlevel.level_name NOT LIKE N'ປະຣິນຍາໂທ' AND tb_educationlevel.level_name NOT LIKE N'ປະຣິນຍາເອກ' AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS W_levelOther,
        IFNULL(COUNT(CASE WHEN (YEAR(CURDATE())-YEAR(tb_member.birthday)) >= 35 THEN 1 END),0) AS kern35,
        IFNULL(COUNT(CASE WHEN (YEAR(CURDATE())-YEAR(tb_member.birthday)) >= 35 AND tb_member.gender  = N'ຍິງ' THEN 1 END),0) AS W_kern35,
        IFNULL(COUNT(CASE WHEN (YEAR(CURDATE())-YEAR(tb_member.birthday)) >= 15 AND (YEAR(CURDATE())-YEAR(tb_member.birthday)) <= 35 THEN 1 END),0) AS age15to35,
        IFNULL(COUNT(CASE WHEN (YEAR(CURDATE())-YEAR(tb_member.birthday)) >= 15 AND (YEAR(CURDATE())-YEAR(tb_member.birthday)) <= 35 AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS W_age15to35,
        IFNULL(COUNT(CASE WHEN tb_member.status = N'ພົ້ນກະສຽນ' and tb_member.gender = N'ຍິງ' THEN 1 END),0) AS W_phonkasien,
        IFNULL(COUNT(CASE WHEN tb_member.status = N'ພົ້ນກະສຽນ' THEN 1 END),0) AS phonkasien,
        IFNULL(COUNT(CASE WHEN tb_member.date_start >= N? AND tb_member.date_start <= N? THEN 1 END),0) AS permmai,
        IFNULL(COUNT(CASE WHEN tb_member.date_start >= N? AND tb_member.date_start <= N? AND tb_member.gender = N'ຍິງ' THEN 1 END),0) AS W_permmai,
        (SELECT COUNT(*) FROM tb_section WHERE status_sect = 'ບັນຈຸ') AS section,
        (SELECT COUNT(*) FROM tb_section WHERE status_sect ='ບັນຈຸ' AND date_sect >= N? AND date_sect <= N? ) AS Newsection,
        (SELECT COUNT(*) FROM tb_unit WHERE status_unit='ບັນຈຸ' ) AS unit,
        (SELECT COUNT(*) FROM tb_unit WHERE status_unit='ບັນຈຸ' AND date_unit >= N? AND date_unit<= N?) AS newUnit
        FROM tb_member
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_educationlevel ON tb_educationlevel.level_id = tb_member.level_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        WHERE tb_member.date_start >= N? AND tb_member.date_start <= N? GROUP BY tb_foundation.fund_name`;
        dbCon.query(sql, [date_start1, date_end1, date_start2, date_end2, date_start3, date_end3, date_start4, date_end4, d_start, d_end], (err, res) => {
            if (err) {
                console.log(`Error while fetching data member statistics with${d_start} and ${d_end}` + err);
                return result(err, null);
            }

            if (res.length) {
                // found
                result(null, res);
                return;
            }
            // not found
            result({ kind: 'not found' }, null);
        });
    } catch (error) {
        console.log(error);
    }
}