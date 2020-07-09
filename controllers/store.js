class Store {
  constructor() {
    this.db = require('../dao/connect');
    this.Token = require('../utils/token');
  }

  add(json) {
    return new Promise((resolve, reject) => {
      if (json.permission_role === '1') {
        this.db.select(['name'], 'store', {name: json.data.name}).then(result => {
          if (result.length === 0) {
            this.db.insert(json.data, 'store').then(res => {
              resolve({code: 200, msg: '门店新建成功'});
            }).catch(err => {
              reject({code: -1, msg: '操作数据库失败'});
            });
          } else {
            reject({code: -1, msg: '门店名已存在'});
          }
        });
      } else {
        reject({code: -1, msg: '权限不足'});
      }
    });
  }

  list(json) {
    return new Promise((resolve, reject) => {
      this.db.select(['id', 'name', 'address', 'phone'], 'store').then(result => {
        resolve({code: 200, data: result});
      }).catch(err => {
        reject({code: -1, msg: '操作数据库失败'});
      });
    });
  }
}

module.exports = new Store();
