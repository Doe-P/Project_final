const dbCon = require('../../config/db');

// Create new certificate and detail
exports.insert = (data, result) => {
    console.log(data);
    let value1 = []  // ຂໍ້ມູນທີ່ຈະ insert tb_certificate
    let value2 = []  // ຂໍ້ມູນທີ່ຈະ insert tb_certificate_detail

    // loop ຂໍ້ມູນຈາກ data ມາເກັັບໃນ array [] 
    for (let i = 0; i < data.length; i++) {
        value1.push([data[i].certific_id, data[i].typeCerti_id, data[i].certific_NO, data[i].title, data[i].amount_cert, data[i].locate, data[i].date_sign, data[i].sign_by]);
        value2.push([data[i].certific_id, data[i].member_id]);
    }

    console.log(value1);
    console.log(value2);

    // this function  ຄັດເອົາຂໍ້ມູນທີ່ຊໍ້າກັນເອົາພຽງຕົວດຽວເທົ່ານັ້ນ example: [1,1,1,1] = [1]
    function uniqBy(a, key) {
        var seen = {};
        return a.filter(function (item) {
            var k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
    }
    let newValue1 = uniqBy(value1, JSON.stringify);  // convert 
    console.log(newValue1);

    // insert tb_certificate
    let sql1 = 'INSERT INTO tb_certificate (certific_id, typeCerti_id, certific_NO, title, amount_cert, locate, date_sign, sign_by) VALUES ?';
    dbCon.query(sql1, [newValue1], (err, res) => {
        if (err) {
            console.log('ERROR1', + err);
            return result(err, null);
        } else if (res.affectedRows > 0) {
            // insert tb_certificate_detail
            let sql2 = 'INSERT INTO tb_certificate_detail (certific_id, member_id) VALUES ?';
            dbCon.query(sql2, [value2], (err, res) => {
                if (err) {
                    console.log('ERROR2', + err);
                    return result(err, null);
                }
                result(null, res);
            });
        }
    });
}

// Update certificate by id
exports.update = (data, id, result) => {
    let sql = 'UPDATE tb_certificate SET typeCerti_id = ?, certific_NO = ?, title = ?, date_sign = ?, sign_by = ? WHERE certific_id = ?';
    dbCon.query(sql, [data.typeCerti_id, data.certific_NO, data.title, data.date_sign, data.sign_by, id], (err, res) => {
        if (err) {
            console.log(`Error while updating tb_certificate with ID${id}` + err);
            return result(err, null);
        }

        if (res.affectedRows == 0) {
            // not found 
            return result({ kind: 'not found' }, null);
        }
        result(null, res);
    });
}

// Get member where fund_name for insert (client)
exports.getMember_client = (id, result) => {
    try {
        let sql = `SELECT tb_member.member_id, tb_member.member_name, tb_member.surname, tb_section.sect_name, tb_unit.unit_name, tb_foundation.fund_name, tb_typemember.typemember, tb_member.status FROM tb_section
        INNER JOIN tb_member ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id 
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        WHERE tb_foundation.fund_id = ?`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`error while fetching data member for client` + err);
                return result(err, null);
            }

            if (res.length) {
                // found
                return result(null, res);
            }
            // nout found
            result({ kind: 'not found' }, null);
        });
    } catch (error) {
        console.log(error);
    }
}

// Get data certificate for client
exports.getCerti_client = (id, result) => {
    try {
        let sql = `SELECT tb_certificate.certific_id, tb_certificate.certific_NO, tb_certificate.title, tb_typecertificate.typeCerti_name, tb_certificate.qty_cert, tb_certificate.sign_by, tb_certificate.date_sign FROM tb_member 
        INNER JOIN tb_certificate_detail ON tb_member.member_id = tb_certificate_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_certificate ON tb_certificate.certific_id = tb_certificate_detail.certific_id
        INNER JOIN tb_typecertificate ON tb_typecertificate.typeCerti_id = tb_certificate.typeCerti_id
        WHERE tb_foundation.fund_name = ?`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`error while fetching data certificate for client` + err);
                return result(err, null);
            }

            if (res.length) {
                // found
                return result(null, res);
            }
            // nout found
            result({ kind: 'not found' }, null);
        });
    } catch (error) {
        console.log(error);
    }
}

// Get data certificate for admin
exports.getCerti_admin = (result) => {
    try {
        let sql = `SELECT tb_certificate.certific_id, tb_certificate.certific_NO, tb_certificate.title, tb_typecertificate.typeCerti_name, tb_certificate.amount_cert,tb_certificate.locate, tb_certificate.sign_by, tb_certificate.date_sign FROM tb_certificate
        INNER JOIN tb_typecertificate ON tb_typecertificate.typeCerti_id = tb_certificate.typeCerti_id`;
        dbCon.query(sql, (err, res) => {
            if (err) {
                console.log(`error while fetching data certificate for admin` + err);
                return result(err, null);
            }
            result(null, res);
        });
    } catch (error) {
        console.log();
    }
}


// Get data certificate by id
exports.getCertificateByID = (id,result) => {
    try {
        let sql = `SELECT tb_certificate.certific_id, tb_certificate.certific_NO, tb_certificate.title, tb_typecertificate.typeCerti_id, tb_certificate.amount_cert,tb_certificate.locate, tb_certificate.sign_by, tb_certificate.date_sign FROM tb_certificate
        INNER JOIN tb_typecertificate ON tb_typecertificate.typeCerti_id = tb_certificate.typeCerti_id
        WHERE tb_certificate.certific_id=?`;
        dbCon.query(sql,[id], (err, res) => {
            if (err) {
                console.log(`error while fetching data certificate by ${id}` + err);
                return result(err, null);
            }
            result(null, res);
        });
    } catch (error) {
        console.log();
    }
}
// Get data certificate_detail for client where fund_name

exports.getCerti_detail_client = (id, result) => {
    try {
        let sql = `SELECT tb_certificate.certific_NO, tb_member.member_name, tb_member.surname, tb_section.sect_name, tb_unit.unit_name, tb_foundation.fund_name, tb_typemember.typemember_name, tb_certificate.title, tb_typecertificate.typeCerti_name, tb_certificate.sign_by, tb_certificate.date_sign FROM tb_member
        INNER JOIN tb_certificate_detail ON tb_member.member_id = tb_certificate_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_certificate ON tb_certificate_detail.certific_id = tb_certificate_detail.certific_id
        INNER JOIN tb_typecertificate ON tb_typecertificate.typeCerti_id = tb_certificate.typeCerti_id
        WHERE tb_foundation.fund_name = ?`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`error while fetching data certificate_detail for client` + err);
                return result(err, null);
            }

            if (res.length) {
                // found
                return result(null, res);
            }
            // nout found
            result({ kind: 'not found' }, null);
        });
    } catch (error) {
        console.log(error);
    }
}

// Get data certificate_detail for admin
exports.getCerti_detail_admin = (id,result) => {
    try {
        let sql = `SELECT tb_certificate.certific_id,tb_certificate.certific_NO,tb_certificate.title,tb_certificate_detail.member_id,tb_typecertificate.typeCerti_name,tb_member.member_name,tb_member.surname,tb_member.gender,tb_typemember.typemember,tb_section.sect_name,tb_unit.unit_name,tb_foundation.fund_name 
        FROM tb_certificate_detail 
        INNER JOIN tb_certificate ON tb_certificate_detail.certific_id=tb_certificate.certific_id 
        INNER JOIN tb_typecertificate ON tb_certificate.typeCerti_id=tb_typecertificate.typeCerti_id 
        INNER JOIN tb_member ON tb_certificate_detail.member_id=tb_member.member_id 
        INNER JOIN tb_typemember ON tb_member.typemember_id=tb_typemember.typemember_id 
        INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id 
        INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id 
        INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id 
        WHERE tb_certificate_detail.certific_id=?`;
        dbCon.query(sql,[id], (err, res) => {
            if (err) {
                console.log(`error while fetching data certificate_detail by ${id}` + err);
                return result(err, null);
            }
            result(null, res);
        });
    } catch (error) {
        console.log(error);
    }
}
// count member all
exports.CountAll=(result)=>{
    try{
      let sql=`SELECT COUNT(tb_certificate_detail.member_id) AS amount FROM tb_certificate_detail INNER JOIN tb_member ON tb_certificate_detail.member_id=tb_member.member_id`;
      dbCon.query(sql,(err,res)=>{
          if(err){
              console.log(`error count all`+err);
              return result(res,null);
          }
          return result(null,res)
      })
    }catch(err){
        console.log(err);
    }
}
// count member female 
exports.CountFemale=(result)=>{
    try{
      let sql=`SELECT COUNT(tb_certificate_detail.member_id) AS amount FROM tb_certificate_detail INNER JOIN tb_member ON tb_certificate_detail.member_id=tb_member.member_id WHERE tb_member.gender='ຍິງ'`;
      dbCon.query(sql,(err,res)=>{
          if(err){
              console.log(`error count female`+err);
              return result(res,null);
          }
          return result(null,res)
      })
    }catch(err){
        console.log(err);
    }
}
// Get Max certificate ID
exports.getCerti_maxID = (result) => {
    try {
        let sql = `SELECT MAX(certific_id) AS id FROM tb_certificate`;
        dbCon.query(sql, (err, res) => {
            if (err) {
                console.log(`error while fetching max ID` + err);
                return result(err, null);
            }
            result(null, res);
        });
    } catch (error) {
        console.log(error);
    }
}