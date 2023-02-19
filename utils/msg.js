function toMsg(toUser, fromUser, content) {
    let msgXml = ''
    msgXml += "<xml>"
    msgXml += "<ToUserName><![CDATA[" + toUser + "]]></ToUserName>"
    msgXml += "<FromUserName><![CDATA[" + fromUser + "]]></FromUserName>"
    msgXml += "<CreateTime>" + new Date().getTime() + "</CreateTime>"
    msgXml += "<MsgType><![CDATA[text]]></MsgType>"
    msgXml += "<Content><![CDATA[" + content + "]]></Content>"
    msgXml += "</xml>"
    return msgXml
}

export { toMsg }