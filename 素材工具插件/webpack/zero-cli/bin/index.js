#!/usr/bin/env node
const fs = require('fs-extra')
const argv = require('minimist')(process.argv.slice(2))
const { execP, resolve, paths: { dllPath }, log } = require('../utils')

const webpackConfigPath = resolve('webpackConfig', false)

switch(argv._[0]) {
  case 'server':
    execP(`cross-env NODE_ENV=development webpack-dev-server --config ${webpackConfigPath}/webpack.dev.config.js --progress --info-verbosity none`)
    break
  case 'build:dev':
    log('正在构建 编译dev版本...')
    execP(`cross-env NODE_ENV=development webpack --config ${webpackConfigPath}/webpack.prd.config.js`)
    break
  case 'build:prd':
    log('正在构建 编译prd版本...')
    execP(`cross-env NODE_ENV=production webpack --config ${webpackConfigPath}/webpack.prd.config.js`)
    break
  case 'dll':
    fs.emptyDirSync(dllPath)
    log('正在生成dll...')
    execP(`cross-env NODE_ENV=development webpack --config ${webpackConfigPath}/webpack.dll.config.js`)
    execP(`cross-env NODE_ENV=production webpack --config ${webpackConfigPath}/webpack.dll.config.js`)
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
