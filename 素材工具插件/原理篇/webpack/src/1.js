const fs = require('fs')
const path = require('path')
'../a/b'
'./a.js'
if (fs.existsSync('./a.js')) {
  fs.readFile('./a.js', 'utf8', function(err, data) {
    if (err) return
    console.log(data)
  })
}

const extensions = ['.js', '.css']