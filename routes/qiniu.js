var express = require('express');
var router = express.Router();
var qiniu = require('qiniu');
var AccessKey= '1bRwfIFdhwLdhNCdGuQaSAFM3Mq6fR1q6LNfIBt2';
var SecretKey= 'UZLdH-U_SHY1nYjjbR9-f3VkKvsw_MrPV-X73mZP';


/* GET home page. */
router.get('/token', function(req, res, next) {
    var mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);
    var options = {
        scope: 'rafa-test',
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    var data = {
        code: 200,
        data: {
            token: uploadToken
        }
    };
    res.send(data);
});



module.exports = router;
