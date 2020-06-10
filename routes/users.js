var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs'); // 载入fs模块

/* GET users listing. */
router.post('/login', function(req, res, next) {
  var file = path.join(__dirname, 'userdata/login.json'); //文件路径，__dirname为当前运行js文件的目录
  fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
});

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
