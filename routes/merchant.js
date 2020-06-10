var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs'); // 载入fs模块


/* GET home page. */
router.post('/findMerChantInfos', function(req, res, next) {
    console.log(req)
    var file = path.join(__dirname, 'merchantdata/findMerChantInfos.json'); //文件路径，__dirname为当前运行js文件的目录

    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
});

module.exports = router;
