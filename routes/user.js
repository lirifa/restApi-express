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
        username: req.body.username,
        password: req.body.password
    };
    user.login(info).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 用户登出
router.post('/logout',verifyToken, function(req, res) {
  console.log(req.userId);
  user.logout(req.userId).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
});

// 获取用户信息
router.get('/info', verifyToken, function(req, res) {
  let id;
  if(req.id){
    id = req.id
  } else {
    id = req.userId
  }
  user.info(id).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  })
});

// 新增店员
router.post('/add', verifyToken, (req, res) => {
  let info = {
    data: req.body,
    permission_role: req.permission_role
  };
  user.add(info).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
});

// 获取店员列表
router.get('/list', verifyToken, (req, res) => {
  let info = {
    data: req.query,
    permission_role: req.permission_role
  };
  user.list(info).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
});

// 店员状态切换
router.post('/switchStatus', verifyToken, (req, res) => {
  let info = {
    data: req.body,
    permission_role: req.permission_role
  };
  user.switchStatus(info).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
});

// 店员信息修改
router.post('/edit', verifyToken, (req, res) => {
  let info = {
    data: req.body,
    permission_role: req.permission_role
  };
  user.edit(info).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
});

module.exports = router;
