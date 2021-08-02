  
const dbCon = require('../../config/db');

// ==============> report member certificate <=================
exports.repCertific_listMember = (id, result) => {
    try {
        let sql = `SELECT tb_certificate.certific_NO, tb_member.member_name, tb_member.gender, tb_member.surname, tb_foundation.fund_name, tb_typemember.typemember, tb_certificate.title, tb_certificate.amount_cert, tb_certificate.sign_by, tb_certificate.date_sign FROM tb_member
        INNER JOIN tb_certificate_detail ON tb_member.member_id = tb_certificate_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_certificate ON tb_certificate.certific_id = tb_certificate_detail.certific_id
        WHERE tb_certificate.certific_NO LIKE N?`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`Error while fetching data report certificate` + err);
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

// ==============> report certificate from year <===============
exports.repCertific_Year = (year, result) => {
    try {
        let sql = `SELECT tb_certificate.certific_NO, tb_certificate.title, tb_certificate.sign_by, tb_certificate.date_sign,
        IFNULL(COUNT(CASE WHEN tb_member.member_id IS NOT NULL THEN 1 END),0) AS result,
        IFNULL(COUNT(CASE WHEN tb_member.gender = N'ຍິງ' THEN 1 END),0) AS women FROM tb_member
        INNER JOIN tb_certificate_detail ON tb_member.member_id = tb_certificate_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_certificate ON tb_certificate.certific_id = tb_certificate_detail.certific_id
        WHERE tb_certificate.date_sign LIKE N?
        GROUP BY tb_certificate.certific_NO, tb_certificate.title, tb_certificate.sign_by, tb_certificate.date_sign`;
        dbCon.query(sql, ['%' + year + '%'], (err, res) => {
            if (err) {
                console.log(`Error while fetching data report certificate with year` + err);
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

// ============> report move from Certificate <================
exports.get_CertificateNO = (year,result) => {
    try {
        let sql = `SELECT certific_NO,title FROM tb_certificate WHERE date_sign LIKE N?`;
        dbCon.query(sql,['%'+year+'%'],(err, res) => {
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
