// import connection from config
const dbCon = require('../../config/db');

// Get all retirement
exports.getAllRetire = (result) => {
    dbCon.query('SELECT * FROM tb_retirement', (err, res) => {
        if (err) {
            console.log('Error while fetching retirements', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// Get data from tb_member where status = 'member' and age > 35
exports.getMemberByStatus = (result) => {
    let status = 'member';
    let age = 35;
    let sql = `SELECT member_name,surname,birthday, (YEAR(CURDATE())-YEAR(birthday)) AS age FROM tb_member WHERE  status = ? AND (YEAR(CURDATE())-YEAR(birthday)) > ?`
    dbCon.query(sql, [status, age],(err, res) => {
        if (err) {
            console.log('Error while fetching data from tb_member where status and age=' + err);
            return result(err, null);
        }
        result(null, res);
    });
}

// Get single retirement by id
exports.getRetireById = (id, result) => {
    dbCon.query('SELECT * FROM tb_retirement WHERE ');
}

// Insert new retirement to database
exports.insertRetire = (data, result) => {
    console.log(data.member_id);
    var ID = '';
    let sql1 = 'SELECT member_id FROM tb_retirement';
    dbCon.query(sql1, (err, res) => {
        if (err) {
            console.log('Error while fetching member_id from tb_retirement' + err);
            return result(err, null);
        }
        console.log(res);


        // //console.log('1'+ ID);
        // if (data.member_id === res.member_id) {
        //     console.log('the same');
        //     return result({ kind: 'the same' }, null);

        // } else {
        //     console.log('not same');
        // }

        //=====================================
        //    for (let i = 0; i < res.length; i++) {
        //        const id = res[i];
        //       // console.log(id);
        //        if (data.member_id == res[i].member_id) {
        //           // console.log(id);
        //            console.log('same');
        //            break;
        //        } else if (data.member_id != res[i].member_id) {
        //              console.log('not same');
        //             break;
        //        }


        //    }
        // ==============

        // res.forEach(id => {
        //     console.log(id);
        //     if (data.member_id === id) {
        //         console.log('the same');
        //     } else {
        //         console.log('not same');
        //     }
        // });
        // });
        // let sql = 'INSERT INTO tb_retirement (member_id, retire_NO, No_Ask, reason, date_Ask, age, date_retire) VALUES (?,?,?,?,?,?,?)';
        // dbCon.query(sql, [data.member_id, data.retire_NO, data.No_Ask, data.reason, data.date_Ask, data.age, data.date_retire], (err, res) => {
        //     if (err) {
        //         console.log('Error while inserting data to tb_retirememt!!' + err);
        //         return result(err, null);
        //     }
        //     result(null, res);
    });
}

// Update retirement
exports.updateRetireById = (data, id, result) => {

}

// Delete retirement
exports.deleteRetireById = (id, result) => {

}