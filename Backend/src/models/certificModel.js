const dbCon = require('../../config/db');

// Create new certificate and detail
exports.insert = (data, result) => {
    console.log(data);
    let value1 = []  // ຂໍ້ມູນທີ່ຈະ insert tb_certificate
    let value2 = []  // ຂໍ້ມູນທີ່ຈະ insert tb_certificate_detail

    // loop ຂໍ້ມູນຈາກ data ມາເກັັບໃນ array [] 
    for (let i = 0; i < data.length; i++) {
        value1.push([data[i].certific_id, data[i].typeCerti_id, data[i].certifi_NO, data[i].title, data[i].qty_cert, data[i].locate, data[i].date_sign, data[i].sign_by]);
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
    let sql1 = 'INSERT INTO tb_certificate (certific_id, typeCerti_id, certific_NO, title, qty_cert, locate, date_sign, sign_by) VALUES ?';
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
    dbCon.query(sql, [data.typeCerti_id, data.certifi_NO, data.title, data.date_sign, data.sign_by, id], (err, res) => {
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