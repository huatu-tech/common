export const timestamp = () => +Date.now()

enum days {
  '一' = 1,
  '二' = 2,
  '三' = 3,
  '四' = 4,
  '五' = 5,
  '六' = 6,
  '日' = 0
}

/**
 * des:        日期操作
 * @proStr:    格式化参数
 * @return:    Date
 * e.g.         proDate(time,'{%y+1}-{%M+2}-{%d+1}-{%H+1}-{%m+1}-{%s+1}') //年月日时分秒全部加1
 */
 export const  proDate = (time: Date, proStr:string): Date | undefined => {
  var dealWith = function(str:string, date: Date) {
    let t = str.substring(0, 1)
    let num = ''
    if (str.indexOf('+') > -1) {
      num = str.substring(str.indexOf('+'))
    } else if (str.indexOf('-') > -1) {
      num = str.substring(str.indexOf('-'))
    }
    switch (t) {
      case 'y':
        date.setFullYear(date.getFullYear() + parseInt(String(num)))
        break
      case 'M':
        date.setMonth(date.getMonth() + parseInt(String(num)))
        break
      case 'd':
        date.setDate(date.getDate() + parseInt(String(num)))
        break
      case 'H':
        date.setHours(date.getHours() + parseInt(String(num)))
        break
      case 'm':
        date.setMinutes(date.getMinutes() + parseInt(String(num)))
        break
      case 's':
        date.setSeconds(date.getSeconds() + parseInt(String(num)))
        break
    }
    return date
  }

  let arr = []
  let date
  arr = proStr.split('{%')
  for (var i = 1; i < arr.length; i++) {
    arr[i] = arr[i].replace('}-', '')
    arr[i] = arr[i].replace('}', '')
    date = dealWith(arr[i], time)
  }
  return date
}



export const formatDate = (dateObj:Date, mask:string):string {

  if (typeof dateObj === 'number') {
    dateObj = new Date(dateObj);
  }

  if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
    throw new Error('Invalid Date in fecha.format');
  }

  mask = mask || 'yyyy-MM-dd';

  var dict:any = {
    yyyy: dateObj.getFullYear(),
    M: dateObj.getMonth() + 1,
    d: dateObj.getDate(),
    H: dateObj.getHours(),
    m: dateObj.getMinutes(),
    s: dateObj.getSeconds(),
    MM: ('' + (dateObj.getMonth() + 101)).substring(1),
    dd: ('' + (dateObj.getDate() + 100)).substring(1),
    HH: ('' + (dateObj.getHours() + 100)).substring(1),
    mm: ('' + (dateObj.getMinutes() + 100)).substring(1),
    ss: ('' + (dateObj.getSeconds() + 100)).substring(1)
  }
  return mask.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
    return dict[arguments[0]]
  })
}



/**
 * 获取某月份第一天和最后一天的时间
 *
 * @param {number} date 时间戳
 * @returns {Array<Date>} 第一天和最后一天
 */
 export const getMonthEnds = (date:Date):Array<Date> => {
  let day = new Date(date)
  let year = day.getFullYear()
  let month = day.getMonth()

  return [new Date(year, month, 1), new Date(year, month + 1, 0)]
}



/**
 * 获取周的大写num
 *
 * @param  {number} day 星期n
 * @returns {string}
 */
 export const getWeekNum = (day:number):string =>  days[day]



/**
 * 处理时间范围的结束时间，补全”23：59：59“
 *
 * @param {number} time 需要处理的时间戳
 * @returns {number} 需要好的时间戳
 */
export const handleEndTime = (time:Date):Date | number => {
  let timeType = Object.prototype.toString.call(time)
  if (timeType == '[object Number]' || timeType == '[object Date]') {
      let date = new Date(time)
      return Number(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59))
  } else {
      throw new Error('传入参数不正确')
  }
}



/**
 * 处理时间范围的开始时间，时间设置为”00：00：00“
 *
 * @param {number} time 需要处理的时间戳
 * @returns {number} 需要好的时间戳
 */
export const handleStartTime = (time:Date):Date | number => {
  let timeType = Object.prototype.toString.call(time)
  if (timeType == '[object Number]' || timeType == '[object Date]') {
      let date = new Date(time)
      return Number(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
  } else {
      throw new Error('传入参数不正确')
  }
}

/**
 * @file params = int(1212121212121)
 * @return  "2017-12"
 *
 **/
 export const timeInit = (time:Date):string => {
  if (!time) {
      return ''
  }
  let timer = new Date(time)
  let year = timer.getFullYear()
  let month = timer.getMonth()
  let day = timer.getDate()
  return String(year) + '/' + month + '/' + day
}
