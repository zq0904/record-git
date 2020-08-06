const nowTiem1 = Date.now()
// 阻塞2s
while(Date.now() - nowTiem1 < 2000) {}
console.log('test1.js 阻塞了2s')