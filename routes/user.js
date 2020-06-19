var express = require('express');
var router = express.Router();
const verifyToken = require('../auth/VerifyToken');
const user = require('../controllers/user');

// 用户注册
router.post('/register', verifyToken, (req, res) => {
  let info = {
    data: req.body,
    permission_role: req.permission_role
  };
    user.register(info).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 用户登录
router.post('/login', function(req, res) {
    let info = {
        name: req.body.name,
        password: req.body.password
    };
    user.login(info).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 获取用户信息
router.post('/info', verifyToken, function(req, res) {
  user.info(req.id).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  })
});

module.exports = router;
