import 'core-js/es6/symbol' // IE Symbol 未定义
import 'core-js/fn/symbol/iterator'
import 'core-js/modules/es6.string.repeat.js'
import 'core-js/modules/es6.string.includes.js'

import * as array from './array.js'
import * as cookie from './cookie.js'
import * as date from './date.js'
import * as env from './env.js'
import * as localStorage from './localStorage.js'
import * as math from './math.js'
import * as number from './number.js'
import * as object from './object.js'
import * as qs from './qs.js'
import * as string from './string.js'
import * as unicode from './unicode.js'
import * as util from './util.js'

const Zero = {
  array,
  cookie,
  date,
  env,
  localStorage,
  math,
  number,
  object,
  qs,
  string,
  unicode,
  util
}

export default Zero
