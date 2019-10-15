type Fn = (...args: any[]) => void
type TimeId = number | NodeJS.Timeout

// 节流
const throttle = (fn: Fn, time = 300) => {
  let after = -Infinity
  let timeId: TimeId
  return () => {
    const nowTime = Date.now()
    const c = nowTime - after
    const _perform = () => {
      after = nowTime
      fn && fn()
    }
    if (c > time) { // 首次 或者 大于
      _perform()
    } else {
      clearTimeout(timeId as number | undefined)
      timeId = setTimeout(_perform, time - c)
    }
  }
}

// 防抖
const debounce = (fn: Fn, time = 300) => {
  let timeId: TimeId
  return function (this: any, ...agrs: any[]) {
    clearTimeout(timeId as number | undefined)
    timeId = setTimeout(() => {
      fn && fn.apply(this, agrs)
    }, time)
  }
}

// 柯里化 这个ts类型实在是难以写出
const curry = (fn: (...args: any[]) => any, ...args: any[]) => {
  if (fn.length > args.length) return (...parameters: any[]) => curry(fn, ...args, ...parameters)
  return fn(...args)
}

// 浏览器类型
type BrowserType = 'Ie' | 'Wx' | 'Ff' | 'Sf' | 'Op' | 'Qq' | 'Ay' | 'Sg' | 'Lb' | 'Ep' | 'Ch' | '未知'

const uA = window.navigator.userAgent
const ua = uA.toLowerCase()
ua.match(/(edge|msie|firefox|opera|version).*?([\d.]+)/)
const userAgent = {
  uA,
  ua,
  isAndroid: ua.indexOf('android') > -1 || ua.indexOf('adr') > -1, // 移动-android
  isIos: !!ua.match(/(iphone|ipad).*mac os x.*/), // 移动-ios
  isMobile: ua.indexOf('mobile') > -1, // 移动终端
  isMac: ua.indexOf('mac os x') > -1, // mac
  isWin: ua.indexOf('windows') > -1, // windows

  version: ua.match(/(edge|msie|firefox|chrome|version).*?([\d.]+)/) ? (ua.match(/(msie|firefox|opera|chrome|version).*?([\d.]+)/) as RegExpMatchArray)[2] : '未知', // 版本
  // 浏览器类型
  browserType: (() => {
    if ((window as any).attachEvent && (ua.includes('edge') || ua.includes('msie') || ua.includes('trident'))) return 'Ie'
    if (ua.includes('micromessenger')) return 'Wx'
    if (ua.includes('firefox') || (ua.includes('gecko') && !ua.includes('khtml') && !ua.includes('trident'))) return 'Ff'
    if (ua.includes('safari') && !ua.includes('chrome') && !ua.includes('maxthon')) return 'Sf'
    if (ua.includes('opr') || ua.includes('presto') || ua.includes('opera')) return 'Op'
    if (ua.includes('qqbrowse') || ua.includes('tencenttraveler')) return 'Qq'
    if (ua.includes('maxthon')) return 'Ay'
    if (ua.includes('metasr')) return 'Sg'
    if (ua.includes('lbbrowser')) return 'Lb'
    if (ua.includes('explorer')) return 'Ep'
    if (ua.includes('chrome')) return 'Ch'
    return '未知'
  })(),
}
// 浏览器 版本
// ie 需要知道 版本
// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134
// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763
// ff 需要知道 版本 Mozilla/5.0 (Windows NT 6.1; WOW64; rv:68.0) Gecko/20100101 Firefox/68.0
// Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0
// safari 需要知道 版本 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15
// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
// 扎牌子浏览器 需要知道 Chrome版本
// Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0
// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
// Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36 LBBROWSER
// Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36
// Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3704.400 QQBrowser/10.4.3587.400
// 系统 及 系统版本
// Windows/XP Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36
// Windows/7 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36
// Windows/10 Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36
// Windows/8.1 Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3704.400 QQBrowser/10.4.3587.400
// Mac OS/10.14.5 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
// Mac OS/10.14.5 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
// Mac OS/10.12.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36
// Linux/x86_64 Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3590.0 Safari/537.36
export {
  throttle,
  debounce,
  curry,
  userAgent
}
