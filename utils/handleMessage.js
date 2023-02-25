
import { toMsg } from './msg.js'

class WecahtBase {
    constructor(xml) {
        this.xml = xml
        this.msgType = xml.MsgType.toLowerCase()
        this.FromUserName = xml.FromUserName
        this.ToUserName = xml.ToUserName
    }
    getMessage() {}
}

class EventMessage extends WecahtBase {

}

class StandardMessages extends WecahtBase {
    getMessage() {
        let message = null
        switch (this.msgType) {
            case "text":
                message = toMsg(this.FromUserName, this.ToUserName, "测试文本哈哈哈哈哈")
                break;
            case "image":
            case "voice":
            case "video":
            case "shortvideo":
            case "location":
            case "link":
            default:
                message = toMsg(this.xml.FromUserName, this.xml.ToUserName, "别乱发，没有这个选项哦")
                break;
        }
        return message
    }
}

export { EventMessage, StandardMessages }