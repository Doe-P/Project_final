
const dbCon = require('../../config/db');

// Insert new activity and detail
exports.insert = (data,result) => {
    let value1 = []  // ຂໍ້ມູນທີ່ຈະ insert tb_activity
    let value2 = []  // ຂໍ້ມູນທີ່ຈະ insert tb_activity_detail

    // loop ຂໍ້ມູນຈາກ data ມາເກັບໃນ array []
   
    for (let i = 0; i < data.length; i++) {
        value1.push([data[i].acti_id, data[i].acti_title, data[i].typeAct_id, data[i].place, data[i].amount_acti, data[i].date_acti]);
        value2.push([data[i].acti_id, data[i].member_id]);
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
    //console.log(newValue1);
    // insert tb_activity
    let sql1 = 'INSERT INTO tb_activity (acti_id, acti_title, typeAct_id, place, amount_acti, date_acti) VALUES ?';
    dbCon.query(sql1, [newValue1], (err, res) => {
        if (err) {
            console.log('ERROR1', + err);
            return result(err, null);
        } else if (res.affectedRows > 0) {
            // insert tb_activity_detail
            let sql2 = 'INSERT INTO tb_activity_detail (acti_id, member_id) VALUES ?';
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

// Update activity By ID
exports.update = (data, id, result) => {
    let sql = 'UPDATE tb_activity SET acti_title = ?, typeAct_id = ?, place = ?, date_acti = ? WHERE acti_id = ?';
    dbCon.query(sql, [data.acti_title, data.typeAct_id, data.place, data.date_acti, id], (err, res) => {
        if (err) {
            console.log(`Error while updating activity with ID${id}` + err);
            return result(err, null);
        }

        if (res.affectedRows == 0) {
            // not found
            return result({ kind: 'not found' }, null);
        }
        result(null, res);
    });
}

// Get data activity for ເລຂາຊາວໜຸ່ມ where acti_tile and fund_name
exports.getAll = (id, result) => {
    try {
        let sql = `SELECT tb_activity.acti_id, tb_activity.acti_title, tb_typeactivity.typeAct_name, tb_activity.qty_acti, tb_activity.place, tb_activity.date_acti FROM tb_member 
        INNER JOIN tb_activity_detail ON tb_member.member_id = tb_activity_detail.member_id
        INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
        INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
        INNER JOIN tb_activity ON tb_activity.acti_id = tb_activity_detail.acti_id
        INNER JOIN tb_typeactivity ON tb_typeactivity.typeAct_id = tb_activity.typeAct_id
        WHERE  tb_foundation.fund_name = ?`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`Error while fetching data for client with ${id}` + err);
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

// Get data activity for admin
exports.getActi = (result) => {
    try {
        let sql = `SELECT tb_activity.acti_id, tb_activity.acti_title, 
        tb_typeactivity.typeAct_name, tb_activity.amount_acti, 
        tb_activity.place, tb_activity.date_acti FROM tb_activity 
        INNER JOIN tb_typeactivity ON tb_typeactivity.typeAct_id = tb_activity.typeAct_id`;
        dbCon.query(sql,(err, res) => {
            if (err) {
                console.log(`Error while fetching data activity for admin with` + err);
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

// Get data activity_detail for client where fund_name
exports.getActivity_Detail = (id, result) => {
    try {
        let sql = `SELECT tb_activity_detail.acti_id, tb_member.member_name, tb_member.surname, tb_section.sect_name, tb_unit.unit_name, tb_foundation.fund_name, tb_typemember.typemember_name, tb_activity.acti_title, tb_typeactivity.typeAct_name, tb_activity.place, tb_activity.date_acti FROM tb_member 
    INNER JOIN tb_activity_detail ON tb_member.member_id = tb_activity_detail.member_id
    INNER JOIN tb_section ON tb_section.sect_id = tb_member.sect_id
    INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
    INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
    INNER JOIN tb_typemember ON tb_typemember.typemember_id = tb_member.typemember_id
    INNER JOIN tb_activity ON tb_activity.acti_id = tb_activity_detail.acti_id
    INNER JOIN tb_typeactivity ON tb_typeactivity.typeAct_id = tb_activity.typeAct_id
    WHERE tb_foundation.fund_name = ?`;
        dbCon.query(sql, [id], (err, res) => {
            if (err) {
                console.log(`error while fetching data activity_detail with${id}` + err);
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

// Get data activity_detail for admin
exports.getActivity_Detail_byID = (id,result) => {
    try {
        let sql = `SELECT tb_activity_detail.acti_id,tb_activity.acti_title,tb_typeactivity.typeAct_name,tb_member.member_name,tb_member.surname,tb_member.gender,tb_typemember.typemember,tb_section.sect_name,tb_unit.unit_name,tb_foundation.fund_name FROM tb_activity_detail 
        INNER JOIN tb_activity ON tb_activity_detail.acti_id=tb_activity.acti_id 
        INNER JOIN tb_member ON tb_activity_detail.member_id=tb_member.member_id 
        INNER JOIN tb_typeactivity ON tb_activity.typeAct_id=tb_typeactivity.typeAct_id 
        INNER JOIN tb_section ON tb_member.sect_id=tb_section.sect_id 
        INNER JOIN tb_unit ON tb_section.unit_id=tb_unit.unit_id 
        INNER JOIN tb_foundation ON tb_unit.fund_id=tb_foundation.fund_id 
        INNER JOIN tb_typemember ON tb_member.typemember_id=tb_typemember.typemember_id 
        WHERE tb_activity_detail.acti_id=?`;
        dbCon.query(sql,[id], (err, res) => {
            if (err) {
                console.log(`error while fetching data activity_detail ` + err);
                return result(err, null);
            }

            result(null, res);
        });
    } catch (error) {
        console.log(error);
    }
}

// Get data member for admin
exports.getMember_admin = (result) => {
    try {
        let status = 'ສະມາຊິກ';
        let sql = `SELECT tb_member.member_id, tb_member.member_name, tb_member.surname,tb_member.gender,tb_typemember.typemember,tb_educationlevel.level_name, tb_section.sect_name, tb_unit.unit_name, tb_foundation.fund_name FROM tb_section 
        INNER JOIN tb_member ON tb_section.sect_id = tb_member.sect_id 
        INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id 
        INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id 
        INNER JOIN tb_typemember ON tb_member.typemember_id=tb_typemember.typemember_id 
        INNER JOIN tb_educationlevel ON tb_member.level_id = tb_educationlevel.level_id
        WHERE tb_member.status =?`;
        dbCon.query(sql, [status], (err, res) => {
            if (err) {
                console.log(`error while fetching data member`);
                return result(err, null);
            }
            result(null, res);
        });
    } catch (error) {
        console.log(error);
    }
}

// Get data member for client where fund_name
exports.getMember_client = (id, result) => {
    try {
        let status = 'ສະມາຊິກ';
        let sql = `SELECT tb_member.member_id, tb_member.member_name, tb_member.surname,tb_member.gender,tb_typemember.typemember,tb_educationlevel.level_name, tb_section.sect_name, tb_unit.unit_name, tb_foundation.fund_name FROM tb_section 
    INNER JOIN tb_member ON tb_section.sect_id = tb_member.sect_id
    INNER JOIN tb_unit ON tb_unit.unit_id = tb_section.unit_id
    INNER JOIN tb_foundation ON tb_foundation.fund_id = tb_unit.fund_id
    INNER JOIN tb_typemember ON tb_member.typemember_id=tb_typemember.typemember_id 
    INNER JOIN tb_educationlevel ON tb_member.level_id = tb_educationlevel.level_id
    WHERE tb_member.status = ? and tb_foundation.fund_id = ?`;
        dbCon.query(sql, [status, id], (err, res) => {
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

// Get largest column foundation ID
exports.getMaxActivityId = (result) => {
    let sql = 'SELECT MAX(acti_id) AS id FROM tb_activity';
    dbCon.query(sql, (err, res) => {
        if (err) {
            console.log('Error while fetching Max activity' + err);
            return result(err, null);
        }
        result(null, res);
    });
  }

// get data activity 
exports.getActivity=(id,result)=>{
    let sql ="SELECT acti_id,acti_title,typeAct_id,place,date_acti FROM tb_activity WHERE acti_id=?";
    dbCon.query(sql,[id],(err,res)=>{
        if(err){
            console.log('Error while fetching  activity by id' + err);
            return result(err, null);
        }
       return result(null,res)
    })
}