class User {

    constructor() {
        this.db = require('../dao/connect');
    }

    test() {
        this.db.select(['name'], 'user', { name: 'qyizhong' }).then(result => {
            console.log(result[0].name);
        });
    }

    register(json) {
        return new Promise((resolve, reject) => {
            this.db.select(['name'], 'user', { name: json.name }).then(result => {
                if (result.length === 0) {
                    this.db.insert(json, 'user').then(res => {
                        resolve({code: 200, msg: 'ok'});
                    }).catch(err => {
                        reject({code: -1, msg: '操作数据库失败'});
                    });
                } else {
                    reject({code: -1, msg: '已经存在此账号'});
                }
            });
        });
    }

    login(json) {
        return new Promise((resolve, reject) => {
            this.db.select(['name', 'password'], 'user', { name: json.name }).then(result => {
                if (result.length !== 0) {
                    if(result[0].password === json.password) {
                        resolve({code: 200, msg: '登录成功', data: result[0]})
                    } else {
                        reject({code: -1, msg: '密码错误'})
                    }
                } else {
                    reject({code: -1, msg: '用户不存在'});
                }
            });
        });
    }

}

module.exports = new User();
