// import connection from conf
const dbCon = require('../../config/db');

// Insert data to tb_move and tb_movedetail
exports.insert = (data, result) => {
    let name_move;
    console.log(data);
    let sql1 = 'INSERT INTO tb_move (move_id, move_NO, m_Year, reason, amount_move, locate, sign_by, date_move) VALUES (?,?,?,?,?,?,?,?)';
    dbCon.query(sql1, [data.move_id, data.move_NO, data.m_Year, data.reason, data.amount_move, data.locate, data.sign_by, data.date_move], (err, res) => {
        if (err) {
            console.log('Error while inserting data to tb_move==>', err);
            return result(err, null);
        } else if (data.move_id == data.move_id) {
            let sql2 = 'INSERT INTO tb_move_detail (move_id, member_id) VALUES ?';
            var values = [
                ['m006', 'fnns1112-17'],
                ['m006', 'fnns1113-17'],
                ['m006', 'fnns1114-17'],
              ];
            dbCon.query(sql2, [values[i].move_id, ], (err, res) => {
                if (err) {
                    console.log('Error while inserting tb_move_detail==>' + err);
                    return result(err, null);
                }
                result(null, res);
            });
        }
    });
}

// Update data to tb_move and tb_movedetail
exports.update = (data, id, result) => {
    console.log(data);
    let sql = 'UPDATE tb_move SET move_NO = ?, m_Year = ?, reason = ?, amount_move = ?, locate = ?, sign_by = ?, date_move = ? WHERE move_id = ?';
    dbCon.query(sql, [data.move_NO, data.m_Year, data.reason, data.amount_move, data.locate, data.sign_by, data.date_move, id], (err, res) => {
        if (err) {
            console.log('Error while updating tb_move' + err);
            return result(err, null);
        } else if (id == id) {
            console.log(id);
            console.log(data.member_id);
            let sql2 = 'UPDATE tb_move_detail SET member_id = ? WHERE move_id = ?';
            dbCon.query(sql2, [data.member_id, id], (err, res) => {
                if (err) {
                    console.log('Error while updating tb_move_detail' + err);
                    return result(err, null);
                }
                result(null, res);
            });
        }
    });
};

// Get all move and movodetail
exports.getAll = (result) => {
    let sql = 'SELECT tb_move.move_id, tb_move.move_NO, tb_move.m_Year, tb_move.reason, tb_move.amount_move, tb_move.locate, tb_move.sign_by, tb_move.date_move, tb_move_detail.member_id FROM tb_move INNER JOIN tb_move_detail ON tb_move.move_id = tb_move_detail.move_id';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching data tb_move and tb_move_detail==>' + err);
            return result(err, null);
        }
        result(null, res);
    });
}

// Get single move and movedetail by id
exports.getById = (id, result) => {
    let sql = 'SELECT tb_move.move_id, tb_move.move_NO, tb_move.m_Year, tb_move.reason, tb_move.amount_move, tb_move.locate, tb_move.sign_by, tb_move.date_move, tb_move_detail.member_id FROM tb_move INNER JOIN tb_move_detail ON tb_move.move_id = tb_move_detail.move_id WHERE tb_move.move_id = ?';
    dbCon.query(sql, [id], (err, res) => {
        if (err) {
            console.log(`Error while fetching data tb_move and tb_movedetail by ID:${id}` + err);
            return result(err, null);
        }

        if (res.length) {
            console.log('found data');
            result(null, res);
            return;
        }
        // not found
        result({ kind: 'not found' }, null);
    });
}