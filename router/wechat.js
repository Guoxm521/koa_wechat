import Router from "koa-router"
import crypto from "crypto"
import sha1 from "sha1"
import { wxConfig } from "./../config.js"
import { WechatServer } from "./../utils/wechat.js"
const { token } = wxConfig
let router = new Router()

// 微信校验
router.get("/", async (ctx) => {
  let { signature, echostr, timestamp, nonce } = ctx.query
  const string1 = [token, timestamp, nonce].sort().join("")
  var cryptosStr = sha1(string1)
  if (cryptosStr === signature) {
    ctx.body = echostr
  } else {
    ctx.body = "mismatch"
  }
})

// 处理微信消息
router.post("/", async (ctx) => {
  let res = await new WechatServer().handleMsg(ctx)
  ctx.body = res
})

export default router
