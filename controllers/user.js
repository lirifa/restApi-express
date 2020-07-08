class User {
  constructor() {
    this.db = require('../dao/connect');
    this.Token = require('../utils/token');
  }

  register(json) {
    return new Promise((resolve, reject) => {
      console.log(json);
      if (json.permission_role === '1') {
        this.db.select(['name'], 'user', {name: json.data.name}).then(result => {
          if (result.length === 0) {
            this.db.insert(json.data, 'user').then(res => {
              resolve({code: 200, msg: '用户注册成功'});
            }).catch(err => {
              reject({code: -1, msg: '操作数据库失败'});
            });
          } else {
            reject({code: -1, msg: '已经存在此账号'});
          }
        });
      } else {
        reject({code: -1, msg: '权限不足'});
      }

    });
  }

  login(json) {
    return new Promise((resolve, reject) => {
      this.db.select(['id', 'name', 'password', 'permission_role'], 'user', {name: json.name}).then(result => {
        if (result.length !== 0) {
          if (result[0].password === json.password) {
            const token = this.Token.encrypt({id: result[0].id, permission_role: result[0].permission_role}, '15d');
            resolve({code: 200, msg: '登录成功', data: result[0], token: token})
          } else {
            reject({code: -1, msg: '密码错误'})
          }
        } else {
          reject({code: -1, msg: '用户不存在'});
        }
      });
    });
  }

  info(id) {
    return new Promise((resolve, reject) => {
      this.db.select(['id', 'name', 'permission_role'], 'user', {id: id}).then(result => {
        if (result.length !== 0) {
          const token = this.Token.encrypt({id: result[0].id, permission_role: result[0].permission_role}, '15d');
          resolve({code: 200, msg: '操作成功', data: result[0], token: token})
        } else {
          reject({code: -1, msg: '未找到用户信息'});
        }
      }).catch(err => {
        reject({code: -1, msg: '操作数据库失败'});
      });
    });
  }

}

module.exports = new User();
