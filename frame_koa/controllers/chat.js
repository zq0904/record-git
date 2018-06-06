// get形式进入聊天页面
var get_chatWindow = async (ctx, next) => {
    if (ctx.state.user) { // 判断用户是否登录过
        ctx.render('chatWindow.html', {
            title: '聊天页面'
        });
    } else {
        ctx.response.redirect('/login');
    }
};
// 登录页 (进入登录页 一定会在登录一遍)
var get_login = async (ctx, next) => {
    ctx.render('login.html', {
        title: '登录页面',
        name: '游客' + random(1,999)
    });
};
// 用户登录存储base64加密后的cookie
let userId = 0; // 用户id
var post_login = async (ctx, next) => {
    let user = {
        id: ++userId,
        name: ctx.request.body.name,
        image: random(0, 9)
    }
    let val = Buffer.from(JSON.stringify(user)).toString('base64'); // base64加密后的cookie
    ctx.cookies.set('name',val); // 设置cookie 如果有会被覆盖
    ctx.response.redirect('/chatWindow');
};
// 登出 清空cookie name字段 跳转到/login页
var get_logout = async (ctx, next) => {
    ctx.cookies.set('name', '');
    ctx.response.redirect('/login');
};

module.exports = {
    'GET /chatWindow': get_chatWindow,
    'GET /login': get_login,
    'POST /login': post_login,
    'GET /logout': get_logout
}

function random(min, max) {
    if (max < min) { [min, max] = [max, min] }
    return Math.floor(Math.random() * (max + 1 - min) + min);
}