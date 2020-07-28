module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['@babel/plugin-transform-react-jsx', {
      pragma: 'MockReact.createElement' // 替换编译JSX表达式时使用的函数
    }]
  ]
}