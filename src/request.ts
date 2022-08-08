/**
 * 在iframe中构建form表单提交
 *
 * @param {string} path     请求地址
 * @param {Object} params   请求参数
 */
export const formRequest = (path: string, params: any = {}) => {
  const ifr = document.createElement('iframe')
  let idiom = null

  try {
    ifr.style.position = 'absolute'
    ifr.style.left = '-10000px'
    ifr.style.top = '-10000px'
    // We can use $('body').append(ifr). But this can't pass the
    // jasmine-node test since the jsdom mock is not perfect. It reports
    // error or 'Wrong Document'. So we use the native document API to
    // append the new document.
    document.getElementsByTagName('body')[0].appendChild(ifr)
    // Create the form content.
    const win = ifr.contentWindow || ifr // 获取iframe的window对象
    idiom = (win as Window).document // 获取iframe的document对象
  }
  catch (e) {
    // 原始ie8下iframe性能的限制，有可能存在iframe未准备好，拒绝访问
    return
  }

  const html = ['<form id="post-form" target="_blank" ',
    'action="', path, '" method="GET">']
  for (const item in params) {
    html.push('<input type="hidden" name="', item, '" value=',
      params[item], '>')
  }
  html.push('</form>')
  const formContent = html.join('')
  idiom.open()
  idiom.write(formContent)
  idiom.close()

  // Submit the form.
  const form = (idiom as Document).getElementById('post-form');
  (form as HTMLFormElement).submit()
  ifr.onload = function () {
    setTimeout(() => {
      if (ifr.parentNode)
        ifr.parentNode.removeChild(ifr)
    }, 100)
  }
}
