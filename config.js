export const wxApiDomain = "https://api.weixin.qq.com/";
export const wxConfig = {
    token: 'gxm1234920',
    appID: '',
    appScrect: '',
    encodingAESKey: '',
    wxApiURLs: {
        accessTokenURL: `${ wxApiDomain }cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s`,
        jsApiTicketURL: `${ wxApiDomain }cgi-bin/ticket/getticket?access_token=%s&type=jsapi`,
        createMenuURL: `${ wxApiDomain }cgi-bin/menu/create?access_token=%s`,
    },
};
