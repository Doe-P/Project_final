const dbCon = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/userModel');

// import key pair
// const private = path.join(__dirname, 'private.pem');
// const public = path.join(__dirname, 'public.pem');

const private_KEY = fs.readFileSync('./certs/private.pem', 'utf8');
const public_KEY = fs.readFileSync('./certs/public.pem', 'utf8');

// value for the rfc7619 fields
const i = 'junior dev';     // i = issuer
const s = 'jwt-token';      // s = subject
const a = 'http://127.0.0.1/';    // a = audience

// generate salt
const saltRounds = 8
const salt = bcrypt.genSaltSync(saltRounds);

// store refresh token 
let RefreshTokens = []

// =============> Setting <=============

// function generate Access token
const generateAccessToken = (payload) => {
    const accessOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "1h",
        algorithm: "RS256"
    }

    const option = accessOptions
    if (payload && payload.exp) {
        delete option.expiresIn
    }
    return jwt.sign(payload, private_KEY, option);
}

// function generate Refresh token 
const generateRefreshToken = (payload) => {
    const refreshOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "1d",
        algorithm: "RS256"
    }

    const option = refreshOptions
    if (payload && payload.exp) {
        delete option.expiresIn
    }
    return jwt.sign(payload, private_KEY, option);
}

// function verify token
const verifyToken = (payload) => {
    const verifyOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: '30d',
        algorithm: ['RS256']
    }
    return jwt.verify(payload, public_KEY, verifyOptions);
}

// =======================================

// Register
const register = async (req, res) => {
    try {
        const { username, password, fund_id,fund_name, status } = req.body;
        //validate request
        if (!username || !password || !status) {
            return res.status(400).send({ msg: 'Please fill in all fields' });
        }

        // get data for check
        let sql1 = `SELECT * FROM tb_account WHERE username = ?`;
        dbCon.query(sql1, [username], async (err, response) => {
            if (err) throw err
            if (response.length > 0) {
                return res.status(401).send({ msg: 'This user already registered' });
            } else {
                // encoded password
                const hash_PSW = await bcrypt.hash(password, salt);

                const users = {
                    username: username,
                    password: hash_PSW,
                    fund_id: fund_id,
                    fund_name:fund_name,
                    status: status
                }

                // save new user
                let sql2 = `INSERT INTO tb_account SET ?`;
                dbCon.query(sql2, users, (err, result) => {
                    if (err) {
                        return res.status(500).send({ msg: 'Eror while add new user' });
                    }
                    res.status(200).send({ msg: 'Succesful', result });
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// =============> changpassword <=============
const changePassword = async (req, res) => {
    try {
        const { username, password, newpassword } = req.body;
        if (!username || !password || !newpassword) {
            return res.status(400).send({ msg: 'Please fill in all fields' });
        }

        let sql1 = `SELECT * FROM tb_account WHERE username = ?`;
        dbCon.query(sql1, [username], async (err, response) => {
            if (err) throw err
            console.log(response);

            // found
            if (response.length > 0) {

                let isMatch = await bcrypt.compare(password, response[0].password)

                if (!isMatch) {
                    return res.status(401).send({ msg: 'Password not match!' });
                } else {
                    //encode new password
                    const new_hash_PSW = await bcrypt.hash(newpassword, salt);

                    let sql2 = `UPDATE tb_account SET password = ? WHERE username = ?`;
                    dbCon.query(sql2, [new_hash_PSW, username], (err, result) => {
                        if (err) {
                            return res.status(500).send({ msg: 'Error change password' });
                        }
                        res.status(200).send({ msg: 'Success change passworded', result });
                    });
                }

            } else {
                // not found
                return res.status(404).send({ msg: 'Not found User' });
            }

        });
    } catch (error) {
        console.log(error);
    }
}

//  =============> Login <=============
const logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        //validate request
        if (!username || !password) {
            return res.status(400).send({ msg: 'Please! provide Username and Password.' })
        }

        let sql = `SELECT * FROM tb_account WHERE username = ?`;
        dbCon.query(sql, [username], async (err, result) => {
            if (err) throw err
            
            // todo here check result.length
            if (result.length == 0 || (!await bcrypt.compare(password, result[0].password))) {
                return res.status(401).send({ msg: 'Username or Password provided is incorrected' });
            } else {
                const user = {
                    id: result[0].id,
                    username: result[0].username
                }

                const access_Token = generateAccessToken(user);
                const refresh_Token = generateRefreshToken(user);
                const response = {
                    status: 'Login success',
                    accessToken: access_Token,
                    refreshToken: refresh_Token
                }

                // add refreshToken to store
                RefreshTokens.push(refresh_Token)

                res.status(200).json(response);
                console.log('Qty refreshToken in store after user LogIn ==> ');
                console.log(RefreshTokens);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

//  =============> Refresh-Token <=============
const refresh_Token = (req, res) => {
    try {
        // take the refresh token from the user
        const username = req.body.username;
        const refreshToken = req.body.token;

        // send error if there is no token or it's invalid
        if (!refreshToken) return res.status(401).json("You are not authenticated !!");
        // check token in store
        if (!RefreshTokens.includes(refreshToken)) {
            // don't have 
            return res.status(403).json("Refresh token is not valid! or token expired");
        }

        // decoded
        let decoded = verifyToken(refreshToken);
        const user = {
            id: decoded.id,
            username: decoded.username,
        }

        // remove token duplicate from store
        RefreshTokens = RefreshTokens.filter((token) => token !== refreshToken);
        const new_AccessToken = generateAccessToken(user);
        const new_RefreshToken = generateRefreshToken(user);
        const response = {
            accessToken: new_AccessToken,
            refreshToken: new_RefreshToken
        }
        // add new refresh token to store
        RefreshTokens.push(new_RefreshToken);
        console.log('Qty refreshToken in store after user refresh ==> ');
        console.log(RefreshTokens);
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
    }
}

//  =============> decode for use information <=============
const authenticateToken = (req, res) => {
    try {
        // take the token frome user
        const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authentication;
        if (!token) {
            return res.status(401).send({ auth: false, msg: 'No token provided!. please provide the token' });
        }
        // set option
        const verifyOptions = {
            issuer: i,
            subject: s,
            audience: a,
            expiresIn: '30d',
            algorithm: ['RS256']
        }
        jwt.verify(token, public_KEY, verifyOptions, (err, decode) => {
            if (err) {
                return res.status(500).send({ auth: false, msg: 'Failed to Unauthorization token !. or token expired!' });
            }
            let userID = decode.id;
            // todo here for get information user
            User.getUserById(userID, (err, result) => {
                if (err) {
                    if (err.kind === 'not found') {
                        return res.status(404).send({ msg: 'Not found' });
                    } else {
                        return res.status(401).send({ msg: 'Error on authentication' });
                    }
                }
                res.status(200).send(result[0]);
            });
        });

    } catch (error) {
        console.log(error);
    }
}

// Logout =============> Logout <=============
const logOut = (req, res) => {
    try {
        const refreshToken = req.body.token;
        
        // verify token in store 
        if (!RefreshTokens.includes(refreshToken)) {
            // don't have token or expired
            return res.status(403).json("Refresh token is not valid! or token expired");
        } else {
            // remove refresh token from store
            RefreshTokens = RefreshTokens.filter((token) => token !== refreshToken);
        }
        console.log(`RefreshTokens have after user logOut ==>`);
        console.log(RefreshTokens);
        res.status(200).json({ msg: 'Logout success' });

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    logIn,
    refresh_Token,
    authenticateToken,
    logOut,
    changePassword,
}