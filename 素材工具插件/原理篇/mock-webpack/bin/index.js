#!/usr/bin/env node

const path = require('path')
const {
  path: { projectPath }
} = require('../lib/util')
const Compiler = require('../lib/Compiler')
const webpackConfig = require(path.resolve(projectPath, 'webpack.config'))

const compiler = new Compiler(webpackConfig)
compiler.start()
