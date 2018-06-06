// http测试
const app = require('../app');
const request = require('supertest'); // 引入超级测试 构造GET等请求
describe('#test koa app', () => {
    let server = app.listen(9900);
    describe('#test server', () => {
        it('#test GET /', async () => {
            let res = await request(server).get('/') // 构造一个 get / 请求 发送给 koa 来获得响应
            .expect('Content-Type', /text\/html/) // 通过supertest 提供的 expect() 来断言请求的结果 注意是 promise对象.expect()
            .expect(200, '<h1>/后面没有?name</h1>');
            console.log(JSON.stringify(res)); // res 能拿到请求的很多信息  个人感觉postman测试非常好
        });
        it('#test GET /?name=qq', async () => {
            request(server)
            .get('/?name=qq')
            .expect('Content-Type', /text\/html/)
            .expect(200, '<h1>qq</h1>');
        });
    });
});