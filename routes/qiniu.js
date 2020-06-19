var express = require('express');
var router = express.Router();
const qiniu = require('../controllers/qiniu.js');
const verifyToken = require('../auth/VerifyToken');


/* 获取七牛云上传token */
router.get('/simpleToken',verifyToken, function(req, res, next) {
    qiniu.simpleToken().then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err)
    })
});


module.exports = router;
