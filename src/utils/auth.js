export default {
    _token: null,
    _user: null,
    _os: null,

    get token() {
        if (!this._token) {
            let str = window.localStorage.getItem("TokenKey")
            try {
                this._token = str
            } catch (err) {
                console.error('Invalid token: ' + err);
            }
        }
        return this._token
    },

    set token(val) {
        if (val) {
            this._token = val
            window.localStorage.setItem("TokenKey", this._token)
        } else {
            window.localStorage.removeItem("TokenKey")
            this._token = null
        }
    },

    get user() {
        if (!this._user) {
            let str = window.localStorage.getItem("UserInfo")
            try {
                this._user = JSON.parse(str)
            } catch (err) {
                console.error('Invalid user info: ' + err)
            }
        }
        return this._user
    },

    set user(val) {
        this._user = Object.assign(this.user || {}, val)
        if (val) {
            window.localStorage.setItem("UserInfo", JSON.stringify(this._user))
        } else {
            window.localStorage.removeItem("UserInfo")
            this._user = null
        }
    },
    get footerstatus () {
        if(window.localStorage){
          return window.localStorage.getItem("HaveFooter")
        }else{
            return true;
        }
        
    },
    get os () {
        if (!this._os) {
            let u = navigator.userAgent;
            this._os = {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                lxapp: u.indexOf('LxwlShoppeApp') > -1 //是否领先未来专柜app 
            }
        }
        return this._os
    }
}