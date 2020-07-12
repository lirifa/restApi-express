var express = require('express');
var multer = require("multer");
const path = require('path');

// 设置图片存储路径
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});



// 添加配置文件到muler对象。
const upload = multer({ storage: storage });

module.exports = upload;
