import { UnauthorizedException } from '@nestjs/common';
import { createHash } from 'crypto';
// import JWT from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JWT = require('jsonwebtoken');
// import {} from 'jwt'
const salt = 'Arivin'; // 拼接随机数防破解
/**
 * 密码加密
 * @param {*} pwd
 * @returns
 */
export function encodePwd(pwd) {
  return createHash('md5')
    .update(pwd + salt)
    .digest('hex');
}

/**
 * 生成token
 * @param data
 * @returns
 */
export const generateToken = (data) => {
  return JWT.sign(data, salt, {
    expiresIn: '10h',
  });
};

/**
 * 验证token
 * @param token token
 * @param cb    回调函数
 */
export const validateToken = (token, cb) => {
  JWT.verify(token, salt, function (err, data) {
    if (err) {
      // console.log(err);
      // cb({ code: false, data: {} });
      throw new UnauthorizedException();
    } else {
      cb({
        code: true,
        data,
      });
    }
  });
};
