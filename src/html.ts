/**
 * 对字符串进行 HTML 编码
 *
 * @param {string} source 字符串
 * @return {string}
 */

export const encodeHTML = (source: any): string => {
  return String(source)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * @file 去除html标签，获取标签内容
 */
export const decodeHTML = (html: string): string => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.innerText
}

/**
 * 去掉HTML，仅保留文本内容
 *
 * @param {string} source 字符串
 * @return {string}
 */

export const skinHTML = (source: string): any => {
  const div = document.createElement('div')
  div.innerHTML = source
  return (div as HTMLDivElement).textContent
}
