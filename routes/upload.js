var express = require('express');
var router = express.Router();
const verifyToken = require('../auth/VerifyToken');
const upload = require('../controllers/upload');


// verifyToken,
// 图片上传
router.post('/img', verifyToken, upload.array('img',5), (req, res) => {
    // 读取上传的图片信息
    var files = req.files;
    console.log(files);
    // 设置返回结果
    var result = {};
    if(!files[0]) {
        result.code = -1;
        result.errMsg = '上传失败';
    } else {
        result.code = 200;
        result.data = {
            url: files[0].path
        }
        result.errMsg = '上传成功';
    }
    res.end(JSON.stringify(result));
});
module.exports = router;