var express = require('express');
var router = express.Router();
const verifyToken = require('../auth/VerifyToken');
const store = require('../controllers/store');

// 新建门店
router.post('/add', verifyToken, (req, res) => {
  let info = {
    data: req.body,
    permission_role: req.permission_role
  };
  store.add(info).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
});

// 修改门店
router.post('/edit', verifyToken, (req, res) => {
  let info = {
    data: req.body,
    permission_role: req.permission_role
  };
  store.edit(info).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
});

// 门店列表
router.get('/list', verifyToken, (req, res) => {
  let info = {
    data: req.body,
    permission_role: req.permission_role
  };
  store.list(info).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
});

module.exports = router;
