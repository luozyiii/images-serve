const fs = require('fs');
const path = require('path');
const config = require('../../config');
const fileUtil = require('../util/file');
const drawQrcode = require('./drawQrcode');

const isClearCache = true; // 是否清空缓存目录

// 清空缓存目录
isClearCache && fileUtil.removeDir({ dir: path.resolve(process.cwd(), config.cachePath) });
// 创建目录
fs.existsSync(config.cachePath) || fs.mkdirSync(config.cachePath);
// 批量生成二维码
const codeArr = [];
for (let a1 = 1; a1 <= 1; a1++) {
  const _value = a1 < 10 ? `0${a1}` : a1;
  codeArr.push(`XXXX-AAA-${_value}`);
}
for (let i = 0; i < codeArr.length; i++) {
  const code = codeArr[i];
  // drawQrcode(code);
  // 需要修改dpi，传第二个参数
  drawQrcode(code, 300);
}
