
import { toMsg } from './msg.js'
import GetApi from './getApi.js'

class WecahtBase {
    constructor(xml) {
        this.xml = xml
        this.msgType = xml.MsgType.toLowerCase()
        this.FromUserName = xml.FromUserName
        this.ToUserName = xml.ToUserName
    }
    getMessage() { }
}

class EventMessage extends WecahtBase {

}

class StandardMessages extends WecahtBase {
    getMessage() {
        let message = null
        switch (this.msgType) {
            case "text":
                message = this.handleText()
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

    async handleText() {
        let message = ''
        let content = ''
        switch (this.xml.Content) {
            case '一言':
                content = await new GetApi().getYiYan()
                break;
            case '安慰':
                content = await new GetApi().getAnWei()
                break;
            case '朋友圈':
                content = await new GetApi().getPyq()
                break;
            case '舔狗':
                content = await new GetApi().getTiangou()
                break;
            case '毒鸡汤':
                content = await new GetApi().getDuJiTang()
                break;
            case '文案美句':
                content = await new GetApi().getWenAnMj()
                break;
            default:
                let list = ['欢迎关注我的公众号', '回复[一言] 一言', '回复[安慰] 安慰', '回复[朋友圈] 朋友圈', '回复[舔狗] 舔狗', '回复[毒鸡汤] 毒鸡汤', '回复[文案美句] 文案美句']
                content = list.join('\n')
                break;
        }
        message = toMsg(this.FromUserName, this.ToUserName, content)
        return message
    }
}

export { EventMessage, StandardMessages }