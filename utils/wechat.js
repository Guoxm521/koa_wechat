import { XMLParser } from "fast-xml-parser"
import got from "got"
import { EventMessage, StandardMessages } from "./handleMessage.js"
import { wxConfig } from "../config.js"
import { format } from "util"
import fs from "fs"
import accessToken from "./../accessToken.txt"

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
    try {
      let current_time = new Date().getTime()
      const { access_token, expires_time } = JSON.parse(accessToken)
      if (access_token === "" || expires_time < current_time) {
        let url = wxConfig.wxApiURLs.accessTokenURL
        let { appID, appScrect } = wxConfig
        url = format(url, appID, appScrect)
        let res = await got(url, {
          responseType: "json",
        })
        let response = res.body
        if (response.errcode === 0) {
          response.expires_time = current_time + response.expires_in * 1000
          fs.writeFile(
            "./../accessToken.json",
            JSON.stringify(response),
            function (err) {
              console.log(err)
            }
          )
          return response.access_token
        } else {
          return response
        }
      } else {
        return access_token
      }
    } catch (error) {
      throw error
    }
  }
  // 创建菜单
  createMenus() {}
  // 获取本地素材的media_id
  getMediaId() {}
}

let res = await new WechatServer().getAccessToken()
console.log("res", res)
