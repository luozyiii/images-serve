const QRCode = require('qrcode');

const generateQR = async (text) => {
  try {
    return await QRCode.toDataURL(text, { margin: 1, quality: 1, width: 800 });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  generateQR,
};
