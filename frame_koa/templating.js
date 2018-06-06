const nunjucks = require('nunjucks')
function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}
// 集成Nunjucks
function templating(path, opts) {
    // 创建Nunjucks的env对象
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        // 给ctx绑定render函数 
        ctx.render = function (view, model) {
            ctx.type = 'text/html'
            // 浅拷贝 把一些公共的变量放入ctx.state并传给View 例如 某个middleware负责检查用户权限，它可以把当前用户放入ctx.state中
            ctx.body = env.render(view, Object.assign({}, ctx.state || {}, model || {})) 
        }
        await next(); // 后续请求
    }
}
module.exports = templating;