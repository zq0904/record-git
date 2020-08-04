const nowTiem = Date.now()
// 阻塞2s
while(Date.now() - nowTiem < 2000) {}
console.log('test.js 阻塞了2s')