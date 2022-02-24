import { createHash } from 'crypto';
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
