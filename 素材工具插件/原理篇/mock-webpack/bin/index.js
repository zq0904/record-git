#!/usr/bin/env node

const path = require('path')
const { path: { projectPath } } = require('../lib/util')
const Compile = require('../lib/Compile')
const webpackConfig = require(path.resolve(projectPath, 'webpack.config'))

new Compile(webpackConfig)
