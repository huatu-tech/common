/**
 * 检查密码强度
 *
 * @param {string} password
 * @returns {Number}
 */
export const checkPasswordStrength = (pwd: string): number => {
  const number = []
  const lowercase = []
  const uppercase = []
  const specialchars = []
  const comb: any = {}
  let key
  for (let f = 0; f < pwd.length; f++) {
    key = pwd.charCodeAt(f)
    if (!comb[key]) {
      if (key >= 48 && key <= 57) {
        number.push(key)
      }
      else {
        if (key >= 65 && key <= 90) {
          uppercase.push(key)
        }
        else {
          if (key >= 97 && key <= 122)
            lowercase.push(key)

          else
            specialchars.push(key)
        }
      }
      comb[key] = true
    }
  }
  let strength = 0
  if (number.length > 0)
    strength++
  if (lowercase.length > 0)
    strength++
  if (lowercase.length > 2)
    strength++
  if (uppercase.length > 0)
    strength++
  if (uppercase.length > 2)
    strength++
  if (specialchars.length > 0)
    strength += 2
  if (specialchars.length > 2)
    strength += 2

  return strength
}

/**
 * @file 图片裁剪压缩
 * @author lixiaobin
 */

function _compressImage(extName: any, width: any, height: any, _noCrop: any) {
  return `?x-oss-process=image/resize,m_fill,h_${height},w_${width}`
}

function _compressImageQiNiu(extName: any, width: any, height: any, _noCrop: any) {
  let result = '?imageView2/1'
  if (!width && !height)
    return result

  if (width)
    result += `/w/${width}`

  if (height)
    result += `/h/${height}`

  return result
}

/**
* 压缩图片
*
* @param {Object} options
* @property {string} options.url 原始图片地址
* @property {number} options.width 显示宽度
* @property {number} options.height 显示高度
* @property {number=} options.rawWidth 原图宽度
* @property {number=} options.rawHeight 原图高度
* @property {boolean} options.noCrop 是否不裁剪
* @return {string} 压缩后的图片地址
*/
export const compressImage = (url: string, options: any) => {
  if (!url)
    return ''

  let extName = url.split('.').pop()
  if (extName === 'gif')
    extName = 'jpg'

  let width = options.width
  let height = options.height

  width = Math.floor(width)
  height = Math.floor(height)

  width = Math.floor(width * 2)
  height = Math.floor(height * 2)

  // 阿里
  if (url.includes('oss'))
    return url + _compressImage(extName, width, height, !!options.noCrop)
  // 七牛

  else if (url.includes('clouddn'))
    return url + _compressImageQiNiu(extName, width, height, !!options.noCrop)

  else
    return url
}

/**
 * 深度拷贝
 *
 * @param {Object} obj 需要拷贝的对象
 * @returns {Object} 拷贝副本
 */
export const deepClone = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(deepClone)
  }
  else if (obj && typeof obj === 'object') {
    const cloned: any = {}
    const keys = Object.keys(obj)
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i]
      cloned[key] = deepClone(obj[key])
    }
    return cloned
  }
  else {
    return obj
  }
}

/**
 * 获取分页的pageDto默认值
 */
export const getPageDto = (): object => {
  return {
    pageNum: 1,
    pageSize: 20,
    count: 0,
  }
}

export const indexBy = (array: Array<any>, key: string): object => {
  const map: any = {}
  array.forEach((item) => {
    map[item[key]] = item
  })
  return map
}

/**
 * @file isRepeat
 */

export const isRepeat = (arr: any): boolean => {
  const hash: any = {}
  for (const i in arr) {
    if (hash[arr[i]])
      return true

    hash[arr[i]] = true
  }
  return false
}

