const Koa = require('koa');

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = `<img src="" />`;
});

app.listen(3000, () => {
  console.log(`http://127.0.0.1:3000`);
});
