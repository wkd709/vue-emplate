// import store from '../vuex/store'
import { Message } from 'element-ui'


/**
 *   Tip Message公共方法
 *   type      success/warning/info/error
 *   content   消息文字
 *   duration  显示时间, 毫秒。设为 0 则不会自动关闭
 *   close     是否显示关闭按钮 true/false
 */
export function message(type,content,close) {
    Message({
        type: type,
        message: content,
        duration: 2000,
        showClose: close
    });
}


/**
 * cookie 设置
 *     cname 存入的参数名
 *     value  存入的值
 *     exdays  过期时间
 */

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + escape(cvalue) + "; " + expires+';path=/';
}

/**
 * cookie 获取
 */

export function getCookie(){
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        // if (c.indexOf('JSESSIONID') != -1) return unescape(c.split('=')[1]);
        if (c.indexOf('JSESSIONID') != -1) {
            return unescape(c.split('=')[1]);
        } else if (c.indexOf('treasureFinal') != -1) {
            return unescape(c.split('=')[1]);
        }
    }
    return "";
}


/**
 * cookie 删除
 */

export function delCookie(name){
   setCookie('JSESSIONID', "", -1);
   setCookie('treasureFinal', "", -1);
}

/**
 * 修改时间戳
 *   fmt  例如：yyyy-MM-dd hh:mm:ss
 */
export function getDate(val,fmt) {
    if (!val) {
       return '';
    }
    if (val && val.length == 10) {
       val = parseInt(val*1000);
    }
    var date = new Date(val);
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

/**
 * 获取url链接地址参数
 *
 */
export function searchUrl() {
    var url =window.location.hash;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.split("?")[1];
        var strs = [];
        if (url.indexOf("&") != -1) {
          strs = str.split("&");
        } else {
          strs.push(str);
        }
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


/**
 * base64加密开始
 *
 */
var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
        + "wxyz0123456789+/" + "=";

export function encode64(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
                + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
}