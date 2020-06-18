var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs'); // 载入fs模块
const Token = require('../utils/token.js');
const verifyToken = require('../auth/VerifyToken')
// 用户注册
router.post('/register', verifyToken, (req, res) => {
    let user = require('../controllers/user');
    console.log(req);
    let info = {
        name: req.body.username,
        password: req.body.password,
        permission_role: req.permission_role
    };
    user.register(info).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 用户登录
router.post('/login', function(req, res, next) {
    let user = require('../controllers/user');
    let info = {
        name: req.body.username,
        password: req.body.password
    };
    user.login(info).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
    // var file = path.join(__dirname, 'userdata/login.json'); //文件路径，__dirname为当前运行js文件的目录
    // fs.readFile(file, 'utf-8', function(err, data) {
    //         if (err) {
    //             res.send('文件读取失败');
    //         } else {
    //             res.send(data);
    //         }
    //     });
});

// 获取用户信息
router.post('/info', function(req, res, next) {
  console.log(req.body)
  var file = path.join(__dirname, 'userdata/userinfo.json'); //文件路径，__dirname为当前运行js文件的目录
  fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
});

// 退出登录
router.post('/logout', function(req, res, next) {
  var file = path.join(__dirname, 'userdata/logout.json'); //文件路径，__dirname为当前运行js文件的目录
  fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
});


module.exports = router;
