import got from 'got'

class BaseGet {
    gotGetMethod(url) {
        return new Promise(async (resolve) => {
            try {
                let res = await got(url)
                resolve(res.body)
            } catch (error) {
                resolve(error)
            }

        })
    }

    strRepalce(str) {
        return str.replace(/<[^>]*>|<\/[^>]*>/gm, "");
    }
}

class GetApi extends BaseGet {
    //一言
    async getYiYan() {
        try {
            let res = await this.gotGetMethod('https://v.api.aa1.cn/api/yiyan/index.php?type=json')
            if (res) {
                return JSON.parse(res).yiyan
            } else {
                return res
            }
        } catch (error) {
            return '获取错误'
        }
    }
    //安慰
    async getAnWei() {
        try {
            let res = await this.gotGetMethod('https://v.api.aa1.cn/api/api-wenan-anwei/index.php?type=json')
            if (res) {
                return JSON.parse(res).anwei
            } else {
                return res
            }
        } catch (error) {
            return '获取错误'
        }
    }
    //朋友圈
    async getPyq() {
        try {
            let res = await this.gotGetMethod('https://v.api.aa1.cn/api/pyq/?aa1=json')
            if (res) {
                return JSON.parse(res).pyq
            } else {
                return res
            }
        } catch (error) {
            return '获取错误'
        }
    }
    //舔狗
    async getTiangou() {
        try {
            let res = await this.gotGetMethod('https://v.api.aa1.cn/api/tiangou/')
            return this.strRepalce(res)
        } catch (error) {
            return '获取错误'
        }
    }
    // 毒鸡汤
    async getDuJiTang() {
        try {
            let res = await this.gotGetMethod('https://v.api.aa1.cn/api/api-wenan-dujitang/index.php?aa1=json')
            if (res) {
                return JSON.parse(res)[0].dujitang
            } else {
                return res
            }

        } catch (error) {
            return '获取错误'
        }
    }
    //文案美句
    async getWenAnMj() {
        try {
            let res = await this.gotGetMethod('https://zj.v.api.aa1.cn/api/wenan-mj/?type=json')
            if (res) {
                return JSON.parse(res).msg
            } else {
                return res
            }

        } catch (error) {
            return '获取错误'
        }
    }
}

export default GetApi