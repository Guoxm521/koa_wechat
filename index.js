import Koa from "koa"
import Router from 'koa-router'
import wechatRouter from './router/wechat.js'

const app = new Koa();
let router = new Router()

// 日志中间件
app.use(async (ctx, next) => {
    // do something
    await next()
    // do something
})
router.use("/wechat", wechatRouter.routes(), wechatRouter.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log("启动成功，端口号：3000");
});