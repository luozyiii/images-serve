const fs = require('fs');
const path = require('path');

// 删除目录
const removeDir = (option) => {
  const { dir } = option;
  if (!dir || !fs.existsSync(dir)) return;

  // 读取目录中文件夹
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.resolve(dir, file);
    const stat = fs.lstatSync(filePath);
    // 如果是directory, 就递归
    if (stat.isDirectory()) {
      removeDir({ dir: filePath });
      return;
    }
    // 如果是文件 就删除
    if (stat.isFile()) {
      fs.unlinkSync(filePath);
    }
  });

  // 删除空目录
  fs.rmdirSync(dir);
};

// removeDir({dir:path.resovle(__dirname,'.cache')});

module.exports = {
  removeDir,
};
