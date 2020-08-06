const nowTiem2 = Date.now()
// 阻塞2s
while(Date.now() - nowTiem2 < 1000) {}
console.log('test2.js 阻塞了1s')