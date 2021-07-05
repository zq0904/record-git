module.exports = {
  // 1. plugins插件在presets之前执行
  // 2. plugins中的每一项正序执行
  // 3. presets中的每一项倒序执行
  presets: ['@babel/env'],
  plugins: [
    [
      './src/babel-plugin.js', { // 传参
        a: 1,
      },
    ],
  ],
}
