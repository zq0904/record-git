const fse = require('fs-extra')
const path = require('path')
const cheerio = require('cheerio')

const defaultConfig = {
  template: './index.html'
}

class HtmlWebpackPlugin {
  constructor(config) {
    this.config = config || defaultConfig
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tap('HtmlWebpackPlugin', compilation => {
      const tplPath = path.resolve(process.cwd(), this.config.template)
      // todo 没有考虑chunks
      const str = fse.readFileSync(tplPath, 'utf8')
      const $ = cheerio.load(str)
      Object.keys(compilation.assets).forEach(asset => {
        $('body').append(
          `<script type="text/javascript" src="${asset}"></script>`
        )
      })
      // todo this.config.template 没有对路径做处理(如 绝对路径 等)
      fse.outputFile(
        path.resolve(compiler.options.output.path, this.config.template),
        $.html()
      )
    })
  }
}

module.exports = HtmlWebpackPlugin
