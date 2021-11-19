import CryptoJS from 'crypto-js';
import { secretKey } from '@/config/token.js';
import { message } from 'antd';

/**
 * 加密信息,本地存储
 * @param {String} key 本地存储key
 * @param {Object} info 用户信息
 */
export async function setLoginInfo(key, info) {
  if (key.length && JSON.stringify(info) !== '{}') {
    // 1.要存储的值  2.加密的秘钥（解密的时候必须要根据秘钥才能解密）
    let cipherText = CryptoJS.AES.encrypt(
      JSON.stringify(info),
      secretKey
    ).toString();
    //对加密数据进行base64处理, 原理：就是先将字符串转换为utf8字符数组，再转换为base64数据
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(cipherText));
    localStorage.setItem(key, encData); //本地存储
    return true;
  } else {
    message.error('网络异常, 请稍后重试');
    return false;
  }
}

/**
 * 取出加密后的信息
 * @param {String} key 本地存储key
 */
export function getLoginInfo(key) {
  if (key.length) {
    /* 取出加密后的value */
    let tk = localStorage.getItem(key); //把存储的值取出
    //将数据先base64还原，再转为utf8数据
    let decData = CryptoJS.enc.Base64.parse(tk).toString(CryptoJS.enc.Utf8);
    //解密数据
    let bytes = CryptoJS.AES.decrypt(decData, secretKey);
    let originalText = bytes.toString(CryptoJS.enc.Utf8); //解密操作
    return JSON.parse(originalText);
  }
}

/**
 * 清除登录状态
 */
export function clearLoginState() {
  localStorage.clear()
  window.location.reload()
}
