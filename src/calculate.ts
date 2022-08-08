/**
 * 把小数转成整数，避免小数计算的精度问题
 *
 * @param {string|number} float 浮点数
 * @param {number=} length 可选，右移的位数
 * @return {number}
 */
export const float2Int = (float: number, length = 0) => {
  const parts = (String(float)).split('.')
  let result

  if (parts.length === 1) {
    result = float + new Array(length + 1).join('0')
  }
  else {
    const l = Math.max(0, length - parts[1].length)
    result = parts.join('') + new Array(l + 1).join('0')
  }

  return Number(result)
}

/**
 * 获得小数的位数
 *
 * @param {string} str
 * @return {number}
 */
export const decimalLength = (str: string): number => {
  const parts = (String(str)).split('.')

  return parts.length === 2 ? parts[1].length : 0
}

export const intNumber = (a: number, b: number): Array<number> => {
  const length = Math.max(
    decimalLength(String(a)),
    decimalLength(String(b)),
  )
  return [float2Int(a, length), float2Int(b, length), length]
}
/**
 * 加法
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export const add = (a: number, b: number): number => {
  const [c, d, length] = intNumber(a, b)

  return (c + d) / Math.pow(10, length)
}

/**
 * @file 减法
 * @author XiaoBin Li
 */

/**
  * 减法
  *
  * @param {number} a
  * @param {number} b
  * @return {number}
  */
export const minus = (a: number, b: number): number => {
  const [c, d, length] = intNumber(a, b)
  return (c - d) / Math.pow(10, length)
}

/**
 * 乘法
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export const multiply = (a: number, b: number): number => {
  const [c, d, length] = intNumber(a, b)

  const factor = Math.pow(10, length)

  return (c * d) / (factor * factor)
}

/**
 * 除法
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export const divide = (a: number, b: number): number => {
  const [c, d] = intNumber(a, b)
  return c / d
}

/**
 * 将阿拉伯数字转大写的中文数字
 */

const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const chnUnitChar = ['', '十', '百', '千']

export const numberToChinese = (section: number): string => {
  let strIns = ''
  let chnStr = ''
  let unitPos = 0
  let zero = true
  let target = section
  while (target > 0) {
    const v = target % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chnStr = chnNumChar[v] + chnStr
      }
    }
    else {
      zero = false
      strIns = chnNumChar[v]
      strIns += chnUnitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    target = Math.floor(target / 10)
  }
  return chnStr
}

/**
 * @file 将金额元改化成毫
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

/**
  * 将金额元改化成毫
  *
  * @param {number} value 元
  * @param {number} unit 单元
  *
  * return {number} 元
  */
export const reverseUnitMoney = (value = 0, unit = 10000) => {
  return multiply(value, unit)
}

