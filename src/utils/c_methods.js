/**
 *  公共方法
 */

 /*
    函数:格式化日期
    参数：time:date或string类型； cFormat:string类型
    调用方式:parseTime(new Date(),'{y}-{m}-{d}');
*/
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}' 
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 获取用户信息
export function getUserInfo(){
    let user_info=JSON.parse(window.localStorage.getItem('UserInfo'));
    return user_info;
}

// 处理电话
export function telHideCenter(val){
    var reg = /^(\d{3})\d{4}(\d{4})$/;
    val = val.replace(reg, '$1****$2');
    return val;
}

export function sleepWait (interval=1000) {
  return new Promise((resolve) =>{ 
      setTimeout(()=>{
          resolve()
      }, interval)
  });
}

//对数字保留两位小数不足2位自动补零
export function returnFloat(value) {
    if (parseFloat(value)>=0) {
      var val = Math.round(parseFloat(value) * 100) / 100;
      var xsd = val.toString().split(".");
      if (xsd.length == 1) {
        val = val.toString() + ".00";
        return val;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          val = val.toString() + "0";
        }
        return val;
      }
    } else {
      return '0.00'
    }
  
  }

  export function formDate(interval,timeValue) {
    let time =Date.parse(timeValue)||Date.parse(new Date());
    return new Date(time-interval*24*60*60*1000)
  }