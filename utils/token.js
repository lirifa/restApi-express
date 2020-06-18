const jwt = require('jsonwebtoken');
const tokenConfig = require('../config/token')
const Token = {
    // 加密
    encrypt:function(data,time){ //data加密数据，time过期时间
        return jwt.sign(data, tokenConfig.secret, {expiresIn:time})
    },
    // 解密
    decrypt:function(token){
        try {
            let data = jwt.verify(token, tokenConfig.secret);
            return {
                token:true,
                id:data.id
            };
        } catch (e) {
            return {
                token:false,
                data:e
            }
        }
    }
}
module.exports = Token;