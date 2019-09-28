module.exports = function(content, map, meta) {
  console.log('1.js')
  return content.replace(/今天/, this.query.name)
}
