// 代理的本质就是：服务器没有跨域
// 只有浏览器才有跨域限制
// 请求真的发过去了，服务端也响应回来了，但是浏览器给你设了一道关卡，不允许你使用跨域数据

// jsonp
// 服务端跨域
// 代理
//    本质：服务端没有跨域

// 服务端不仅仅可以用于提供服务，还可以充当一个客户端

const http = require('http')

http.get('http://nodejs.org/dist/index.json', (res) => {

  res.setEncoding('utf8');
  let rawData = '';

  // 以流的方式接收对方服务器响应回来的数据
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
