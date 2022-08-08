/**
 * 把查询字符串解析成对象，反向操作可用 $.param
 *
 * @param {string} queryStr 查询字符串，可直接把 location.search 或 location.hash 扔进来解析
 * @return {Object}
 */
export const parseQuery = (queryStr: string): any => {
  const result: any = { }

  if (typeof queryStr === 'string' && queryStr.length > 1) {
    let startIndex = 0
    let qs = queryStr

    const firstChar = qs.charAt(0)

    // query 如 ?a=1
    if (firstChar === '?') {
      startIndex = 1
    }
    // hash 如 #a=1
    else if (firstChar === '#') {
      startIndex = 1

      const secondChar = qs.charAt(1)
      // hash 如 #/a=1&b=2
      if (secondChar === '/')
        startIndex = 2
    }

    if (startIndex > 0)
      qs = queryStr.substring(startIndex)

    qs.split('&').forEach(
      (item) => {
        const parts = item.split('=')
        if (parts.length === 2) {
          let key = parts[0].trim()
          let value = (parts[1].trim()) || ''

          const specialChar = value.indexOf('#')

          if (key.indexOf('?') > 0)
            key = key.split('?')[1]

          if (specialChar >= 0)
            value = value.substring(0, specialChar)

          if (key)
            result[key] = decodeURIComponent(value)
        }
      },
    )
  }

  return result
}

/**
* 解析 url，返回格式遵循 location 属性的命名
*
* @param {string} url
* @return {Object}
*/
export const parseUrl = (url: string): any => {
  const link = document.createElement('a')
  link.href = url

  // 用 a 来格式化
  const targetUrl = link.href

  let origin = ''

  if (link.protocol && link.host)
    origin = `${link.protocol}//${link.host}`

  else if (/^(http[s]?:\/\/[^/]+)(?=\/)/.test(targetUrl))
    origin = RegExp.$1

  // xp 下 http 可能会解析出 80 端口，实际是不需要的
  const terms: Array<any> = origin.split(':')

  if (origin.indexOf('http:') === 0
      && terms.length === 3
      && terms[2] === 80
  ) {
    terms.length = 2
    origin = terms.join(':')
  }

  let pathname = link.pathname

  if (pathname && pathname.charAt(0) !== '/')
    pathname = `/${pathname}`

  return {
    origin,
    pathname,
    search: link.search,
  }
}

/**
* 获取当前网页的 origin（可在现代浏览器控制台输入 location.origin）
*
* @param {?string} url
* @return {string}
*/
export const getOrigin = (url: string): any => {
  let targetUrl = url
  if (!targetUrl)
    targetUrl = document.URL

  return parseUrl(targetUrl).origin
}

/**
 *  获取当前url的search
 */
export const getUrlSearch = () => parseQuery(window.location.search)

/**
 * 将对象转化成url参数
 *
 * @param {Object} obj 需要处理的对象
 *
 * @returns {string} 处理好的字符串
 */
export const params = (obj: any): string => {
  const result = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      result.push(`${key}=${obj[key]}`)
  }
  return result.join('&')
}
