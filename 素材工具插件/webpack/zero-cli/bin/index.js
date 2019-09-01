#!/usr/bin/env node
const fs = require('fs-extra')
const argv = require('minimist')(process.argv.slice(2))
const { execP, resolve, paths: { dllPath } } = require('../utils')

const webpackConfigPath = resolve('webpackConfig', false)

switch(argv._[0]) {
  case 'dev':
    execP(`cross-env NODE_ENV=development webpack-dev-server --config ${webpackConfigPath}/webpack.dev.config.js`)
    break
  case 'build':
    execP(`cross-env NODE_ENV=production webpack --config ${webpackConfigPath}/webpack.prd.config.js`)
    break
  case 'dll':
    fs.emptyDirSync(dllPath)
    execP(`cross-env NODE_ENV=development webpack --config ${webpackConfigPath}/webpack.dll.config.js`)
    execP(`cross-env NODE_ENV=production webpack --config ${webpackConfigPath}webpack.dll.config.js`)
    break
  case 'analyzer:dev':
    execP(`cross-env NODE_ENV=development webpack --config ${webpackConfigPath}/webpack.analyzer.config.js`)
    break
  case 'analyzer:prd':
    execP(`cross-env NODE_ENV=production webpack --config ${webpackConfigPath}/webpack.analyzer.config.js`)
    break
  default:
    // --help
}
