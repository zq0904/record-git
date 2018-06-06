const ws = require('ws');
const WebSocketServer = ws.Server;
const Cookies = require('cookies');

// 创建wws 并设置监听事件
function createWebSocketServer(server) {
    let wss = new WebSocketServer({
        server: server // 会自动根据协议来区分 http请求 和 ws请求
    });
    // 注册 广播事件
    wss.broadcast = function (data) {
        wss.clients.forEach(function (ws) { // wss.clients拿到所有 正在连接的 ws 给每个ws发送data
            if (ws.readyState === ws.OPEN) {
                ws.send(data);
            }
        });
    };
    // wss 连接事件 每个用户只会连接一次 并 保持着连接
    wss.on('connection', function (ws, request) { // ws实例 客户端发送的ws请求对象
        if (request.url !== '/ws/chat') { // 无效的 ws url
            ws.close(4000, '无效的 ws url');
            return;
        }
        let user = parseCookie(request); // 解码cookie
        if (!user) { // cookie不存在 关闭ws （实际上这种情况不存在 进入页面路由会判断一次 没有有效的cookie直接去登录 有效的cookie在会返回页面在从上到下加载的过程中去发送ws请求）
            ws.close(4001, '不存在 cookie');
            return;
        }
        ws.on('message', function (message) { // ws收到客户端消息事件
            if (message && message.trim()) {
                let data = createMessage('chat', user, message.trim());
                wss.broadcast(data); // 广播
            }
        });
        ws.on('close', function () { // ws关闭事件 用户从浏览器的一个页面离开 会自动关闭ws连接
            console.log('ws close');
            wss.broadcast(createMessage('left', user, `${user.name} 用户退出`)); // 用户退出 广播
        });
        ws.on('error', function () { // ws错误事件
            console.log('ws error');
        });

        wss.broadcast(createMessage('join', user, `${user.name} 用户加入`)); // 用户加入 广播

        // 每一个用户只会链接一次wss wss是唯一的 而ws却有多个 每个用户连接都会返回自己的的ws和request
        ws.user = user; // 将当前用户的user挂到ws下面 同一个用户只会覆盖自己的ws.user
        // 查询所有的用户
        var users = new Array();
        wss.clients.forEach(function (ws) {
            return users.push(ws.user); // 查询wss下面所有的客户端的ws取user
        });
        ws.send(createMessage('list', user, users)); // 为了告诉后进入的用户该房间有多少人
    });
    return wss
}

// 解码cookie
function parseCookie(obj) { // 参数可能是 经base64编码的cookie 或者是 websocket 的 header 
    if (!obj) return;
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) { // 当传入 request.headers拿到 请求头 包含cookie
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString()); // 实现base64解码
            return user;
        } catch (err) {
            console.log(`parseCookie error ${err}`);
        }
    }
}

// 创建一定格式的消息
let messageIndex = 0; // 消息id
function createMessage(type, user, data) {
    messageIndex++;
    return JSON.stringify({
        id: messageIndex,
        type, // 类型
        user, // cookie解码
        data  // 消息
    });
}

module.exports = {
    parseCookie,
    createWebSocketServer
}