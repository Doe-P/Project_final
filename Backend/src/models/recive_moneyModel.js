const dbCon = require('../../config/db');

// insert receive money and detail
exports.insertMn = (data, result) => {
    try {
        const value1 = []   // money
        const value2 = []   // detail

        // loop ຂໍ້ມູນຈາກ data ມາເກັັບໃນ array [] 
        for (let i = 0; i < data.length; i++) {
            value1.push([data[i].receive_id,data[i].receive_NO, data[i].quarterly, data[i].year, data[i].mtotal, data[i].date, data[i].fund_id, data[i].user_name]);
            value2.push([data[i].receive_id, data[i].member_id, data[i].qty_month]);
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

        // =============> insert receive_money <==============
        let sql1 = `INSERT INTO tb_receive_money (receive_id,recive_NO, quarterly, year, money_total, date, fund_id, user_name) VALUES ?`
        dbCon.query(sql1, [newValue1], (err, res) => {
            if (err) {
                console.log(`Error todo 1 ` + err);
                return result(err, null);
            } else if (res.affectedRows > 0) {
                // ================> insert receive_detail <==================
                let sql2 = `INSERT INTO tb_receive_detail (receive_id, member_id, amount_month) VALUES ?`;
                dbCon.query(sql2, [value2], (err, res) => {
                    if (err) {
                        console.log(`Error todo 2 ` + err);
                        return result(err, null);
                    }
                    result(null, res);
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// get data receive money for client
exports.getReceiveMoney_client = (id, result) => {
    try {
        let sql = `SELECT tb_receive_money.receive_id,tb_receive_money.recive_NO, tb_foundation.fund_name, tb_receive_money.quarterly, tb_receive_money.year,  tb_receive_money.money_total, tb_receive_money.date FROM tb_receive_money
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_receive_money.fund_id
        WHERE tb_foundation.fund_id = ?`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`error while fetching data receive money for client` + err);
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

// get data Receive money for admin
exports.getReceiveMoney_admin = (result) => {
    try {
        let sql = `SELECT tb_receive_money.receive_id,tb_receive_money.recive_NO,  tb_foundation.fund_name, tb_receive_money.quarterly, tb_receive_money.year, tb_receive_money.money_total, tb_receive_money.date FROM tb_receive_money
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_receive_money.fund_id`;
        dbCon.query(sql, (err, res) => {
            if (err) {
                console.log(`error while fetching data receive money for admin` + err);
                return result(err, null);
            }
            result(null, res);
        });
    } catch (error) {
        console.log(error);
    }
}

// get data Receive detail for client 
exports.getReceiveDetail_client = (id, result) => {
    try {
        let sql = `SELECT tb_receive_detail.receive_id, tb_member.member_name, tb_member.surname, tb_section.sect_name, tb_unit.unit_name, tb_foundation.fund_name, tb_typemember.typemember, tb_receive_detail.money, tb_receive_detail.qty_month, tb_receive_detail.total, tb_receive_money.quarterly, tb_receive_money.year, tb_receive_money.date FROM tb_member
        INNER JOIN tb_receive_detail ON tb_member.member_id = tb_receive_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_receive_money ON tb_receive_money.receive_id = tb_receive_detail.receive_id
        WHERE tb_foundation.fund_id = ?`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`error while fetching data receive detail for client` + err);
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

// get data Receive detail for admin
exports.getReceiveDetail_admin = (id,result) => {
    try {
        let sql = `SELECT tb_receive_detail.member_id,tb_receive_money.recive_NO,tb_receive_detail.amount_month,tb_member.member_name,tb_member.surname,tb_member.gender,tb_typemember.typemember,tb_typemember.money,tb_section.sect_name,tb_unit.unit_name,(tb_receive_detail.amount_month*tb_typemember.money) AS total
         FROM tb_receive_detail 
         INNER JOIN tb_receive_money ON tb_receive_detail.receive_id=tb_receive_money.receive_id 
         INNER JOIN tb_member ON tb_receive_detail.member_id=tb_member.member_id 
         INNER JOIN tb_typemember ON tb_member.typemember_id = tb_typemember.typemember_id 
         INNER JOIN tb_section ON tb_member.sect_id = tb_section.sect_id 
         INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id 
         WHERE tb_receive_detail.receive_id=?`;
        dbCon.query(sql,[id], (err, res) => {
            if (err) {
                console.log(`error while fetching data receive detail for admin` + err);
                return result(err, null);
            }
            result(null, res);
        });
    } catch (error) {
        console.log(error);
    }
}

// get Max receive money ID
exports.getReceiveMoney_MaxID = (result) => {
    try {
        let sql = `SELECT MAX(receive_id) as id FROM tb_receive_money`;
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

// get data member for insert receive money
exports.getMember = (id, result) => {
    try {
        let sql = `SELECT tb_member.member_id, tb_member.member_name, tb_member.surname, tb_section.sect_name, tb_unit.unit_name, tb_foundation.fund_name,tb_typemember.typemember,tb_typemember.money FROM tb_section
        INNER JOIN tb_member ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        WHERE tb_member.status = N'ສະມາຊິກ' AND tb_foundation.fund_id = ?`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`error while fetching data member`);
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


// ==============> get quarterly where year and fund_id <==================
exports.getQuarterlyWhereYear = (id,data, result) => {
    try {
        let sql = `SELECT quarterly FROM tb_receive_money
        WHERE year = ? AND fund_id = ?`;
        dbCon.query(sql, [id,data], (err, res) => {
            if (err) {
                console.log(`Error while fetching count year and quarterly and fund_id` + err);
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