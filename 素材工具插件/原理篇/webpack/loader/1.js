module.exports = function (content, map, meta) {
  console.log('1.js')
  console.log('content', content)
  return content.replace(/今天/, this.query.name)
}