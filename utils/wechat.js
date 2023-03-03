import { XMLParser } from "fast-xml-parser"
import got from "got"
import { EventMessage, StandardMessages } from "./handleMessage.js"
import { wxConfig } from "../config.js"
import { format } from "util"

export class WechatServer {
  async handleMsg(ctx) {
    let wechatData = await this.getWechatData(ctx)
    const msgXml = Buffer.concat(wechatData).toString("utf-8")
    const parser = new XMLParser()
    const { xml } = parser.parse(msgXml)
    const { MsgType } = xml
    let reportMsg = null
    if (MsgType.toLowerCase() === "event") {
      reportMsg = new EventMessage(xml).getMessage()
    } else {
      reportMsg = new StandardMessages(xml).getMessage()
    }
    return reportMsg
  }

  getWechatData(ctx) {
    return new Promise((resolve, reject) => {
      try {
        let postData = []
        ctx.req.addListener("data", (data) => {
          postData.push(data)
        })
        ctx.req.on("end", () => {
          resolve(postData)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  // 获取微信公众号access_token
  async getAccessToken() {
    let url = wxConfig.wxApiURLs.accessTokenURL
    console.log(url)
    let { appID, appScrect } = wxConfig
    url = format(url, appID, appScrect)
    let res = await got(url, {
      responseType: "json",
    })
    console.log(res.body)
  }
  // 创建菜单
  createMenus() {}
  // 获取本地素材的media_id
  getMediaId() {}
}

new WechatServer().getAccessToken()
