(function($, window) {
  const pluginName = 'pluginName'
  if ($.fn[pluginName]) return

  const defaults = {
    width: 1
  }

  const P = class {
    constructor($el, options) {
      this.$el = $el
      this.options = Object.assign(defaults, options)
    }
    // add(...args) {}
  }

  $.fn[pluginName] = function(options = {}, ...args) {
    const type = typeof options
    switch (type) {
      case 'string':
        const method = options
        const plugin = this.data(pluginName) // 实例对象
        if (!plugin) return this
        if (method === 'getPlugin') return plugin
        if (!Object.getOwnPropertyNames(P.prototype).includes(method)) throw new Error(`${pluginName} not have an ${method} method`)
        return this.each(function() {
          const plu = $(this).data(pluginName)
          if (plu) plu[method](...args)
        })
      case 'object':
        return this.each(function() {
          const $that = $(this)
          if (!$that.data(pluginName)) $that.data(pluginName, new P($that, options))
        })
      default:
        return this
    }
  }

})(jQuery, window);