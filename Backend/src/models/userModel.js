const dbCon = require('../../config/db');

// ==============> Get single user <==============
exports.getUserById = (id, result) => {
    try {
        let sql = `SELECT id, username, password, fund_id, status FROM tb_account WHERE id = ?`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`Error while fetching data with ID: ${id}`);
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

// ==============> Get user  <==============
exports.getUser = (result) => {
    try {
        let sql = `SELECT tb_account.id, tb_account.username,tb_account.status,tb_account.fund_name
         FROM tb_account `;
        dbCon.query(sql, (err, res) => {
            if (err) {
                console.log(`error while fetching data user`);
                return result(err, null);
            }
            result(null, res);

        });
    } catch (error) {
        console.log(error);
    }
}

// ==============> Delete User <==============
exports.deleteUser = (id, result) => {
    try {
        let sql = `DELETE FROM tb_account WHERE id = ?`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`error while delete`);
                return result(err, null);
            }
            if (res.affectedRows == 0) {
                // not found 
                result({ kind: 'not found' }, null);
                return;
            }
            // deleted unit with the id
            result(null, res);
        });
    } catch (error) {
        console.log(error);
    }
}
