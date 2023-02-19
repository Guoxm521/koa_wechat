import { XMLParser } from "fast-xml-parser";
import { toMsg } from "./msg.js"

// 处理微信公众号的消息 
async function handleMsg(ctx) {
    let wechatData = await getWechatData(ctx)
    const msgXml = Buffer.concat(wechatData).toString('utf-8');
    const parser = new XMLParser();
    const { xml } = parser.parse(msgXml);
    const { MsgType } = xml;
    let reportMsg = null
    if (MsgType.toLowerCase() === 'event') {
        reportMsg = eventMessage(xml)
    } else {
        reportMsg = standardMessages(xml)
    }
    return reportMsg

}

// 处理普通消息
function standardMessages(xml) {
    const { ToUserName, FromUserName, MsgType, Event, Content, EventKey } = xml;
    let message = null
    switch (MsgType.toLowerCase()) {
        case "text":
            message = toMsg(FromUserName, ToUserName, "测试文本哈哈哈哈哈")
            break;
        case "image":
            break;
        case "voice":
            break;
        case "video":
            break;
        case "shortvideo":
            break;
        case "location":
            break;
        case "link":
            break;
        default:
            message = toMsg(FromUserName, ToUserName, "测试文本哈哈哈哈哈")
            break;
    }
    return message
}

// 处理事件消息
function eventMessage(xml) {
    const { ToUserName, FromUserName, MsgType, Event, Content, EventKey } = xml;
    return null

}



// 微信返回的数据为二进制的数据流，因此需要通过监听数据响应的方式获取完整的数据，利用数组做数据缓存
function getWechatData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postData = []
            ctx.req.addListener('data', (data) => {
                postData.push(data)
            })
            ctx.req.on('end', () => {
                resolve(postData)
            })

        } catch (err) {
            reject(err)
        }
    })
}



export { getWechatData, handleMsg }