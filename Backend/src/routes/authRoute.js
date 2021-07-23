const express = require('express');
const router = express.Router();

const Auth = require('../auths/authenticate');
const { getUser, deleteUser } = require('../models/userModel');

router.post('/api/v1/auth/signUp', Auth.register);
router.post('/api/v1/auth/changePassword', Auth.changePassword);
router.post('/api/v1/auth/signIn1', Auth.logIn);
router.post('/api/v1/auth/refresh-token1', Auth.refresh_Token);
router.post('/api/v1/auth/profile', Auth.authenticateToken);
router.post('/api/v1/auth/signOut', Auth.logOut);



// get user
router.get('/api/v1/getUser', (req, res) => {
    getUser((err, result) => {
        if (err) {
            return res.status(500).send({msg: 'some error'});
        }
        res.json(result);
    });
});

// delete user
router.delete('/api/v1/user/:id', (req, res) => {
    const id = req.params.id;
    deleteUser(id, (err, result) => {
        if (err) {
            if (err.kind === 'not found') {
                return res.status(404).send({ msg: `Not found user with the id ${id}` });
            } else {
                return res.status(500).send({ msg: 'Could not delete user with the id' + id });
            }
        }
        res.json(result);
    });
});


module.exports = router;