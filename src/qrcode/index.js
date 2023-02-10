const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const generateQR = require('./util');

const drawQrcode = async (code) => {
  // 开始
  const multiple = 5; // 倍数
  let deviation = 25; // 偏移量
  const codeArr = code.split('-');
  if (codeArr[2].length === 3) {
    deviation = deviation * 0.5;
  } else if (codeArr[2].length === 2) {
    deviation = deviation * 1;
  } else {
    deviation = 0;
  }

  const canvas = createCanvas(288 * multiple, 72 * multiple);
  const ctx = canvas.getContext('2d');

  // 左侧矩形
  ctx.fillStyle = '#ffce00';
  ctx.fillRect(0, 0, 64 * multiple, 72 * multiple);
  // 左侧文本
  ctx.font = `${5 * multiple}px SansSC`;
  ctx.fillStyle = '#000000';
  ctx.fillText('扫 码 查 看 设 备', 12 * multiple, 66 * multiple);

  // 右侧矩形
  ctx.fillStyle = '#0049ff';
  ctx.fillRect(64 * multiple, 0, 224 * multiple, 72 * multiple);

  // 网络图片
  // const _img = await loadImage(`https://t7.baidu.com/it/u=751703219,3002744436&fm=193&f=GIF`);
  // ctx.drawImage(_img, 8 * multiple, 8 * multiple, 48 * multiple, 48 * multiple);

  // 左侧二维码
  const _qrImg = await generateQR(code);
  const _img = await loadImage(_qrImg);
  ctx.drawImage(_img, 8 * multiple, 8 * multiple, 48 * multiple, 48 * multiple);

  const _img2 = await loadImage(`${process.cwd()}/src/qrcode/resources/jxxq.png`);
  ctx.drawImage(_img2, (72 + deviation) * multiple, 12 * multiple, 80.6 * multiple, 43.9 * multiple);

  // 中间字体
  ctx.font = `${15 * multiple}px SansSC`;
  ctx.fillStyle = '#0049ff';
  ctx.fillText(`${codeArr[0]}-${codeArr[1]}`, (74 + deviation) * multiple, 52 * multiple);
  // 右侧字体
  ctx.font = `${50 * multiple}px SansSC`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${codeArr[2]}`, (160 + deviation) * multiple, 54 * multiple);

  const out = fs.createWriteStream(process.cwd() + `/.cache/${code}.jpeg`);
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('The jpeg file was created.'));
};

// 批量生成二维码
const codeArr = ['XXXX-CCC-0600', 'XXXX-CCC-601'];
for (let index = 0; index < codeArr.length; index++) {
  const code = codeArr[index];
  drawQrcode(code);
}
