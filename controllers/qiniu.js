class Qiniu {
  constructor() {
    this.db = require('../dao/connect');
    this.qiniu = require('qiniu');
    this.qiniuConfig = require('../config/qiniu.js');
    this.mac = new this.qiniu.auth.digest.Mac(this.qiniuConfig.AccessKey, this.qiniuConfig.SecretKey);
  }

  simpleToken() {
    return new Promise((resolve, reject) => {
      var options = {
        scope: 'rafa-test',
      };
      try {
        var putPolicy = new this.qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(this.mac);
        resolve({code: 200, data: { token: uploadToken}})
      } catch (e) {
        reject(e)
      }
    })
  }

}
module.exports = new Qiniu();
