// node.js 自带的断言模块 写法
// const assert = require('assert');
// const sum = require('../_test');
// assert.strictEqual(sum(1, 2), 3); // 判断参数1的运行结果是否等于参数2 是断言为 true 否抛出错误

// mocha默认会执行test目录下的所有测试，不要去改变默认目录
// 默认使用mocha 默认的BDD-style测试 describe 可以任意嵌套 便于把相关测试看成一个测试组
// 编写测试的原则 1.一次只测试一种情况 且代码要很简单 2.编写多个测试分别测试不同值得输入 使用 断言 assert
// 运行方法 1.配置 package.json "test": "mocha" 字段 运行 npm test 2.根目录下执行 node node_modules\mocha\bin\mocha 3.根目录下执行 node_modules\.bin\mocha

// const assert = require('assert');
// // const fn = require('../_test'); // 同步函数
// const async_fn = require('../_test'); // 异步函数
// describe('# mocha测试组', () => {
//     // describe('# 同步', () => {
//     //     before(() =>{ // 只会在整体前后执行
//     //         // console.log('before'); // 应放置 所有it共用 且 不变的资源
//     //         this.a = 1;
//     //     });
//     //     // after(() => {
//     //     //     console.log('after');
//     //     // });
//     //     // beforeEach(() => { // 每次it前后都会执行
//     //     //     console.log('beforeEach'); // 应放置 所有it都使用 但是需要重置的
//     //     // });
//     //     // afterEach(() => {
//     //     //     console.log('afterEach');
//     //     // });

//     //     it('fn(1) 结果为 0', () => { // 代表一个测试
//     //         assert.strictEqual(fn(this.a), 0)
//     //     });
//     //     it('fn(1) 结果为 1', () => {
//     //         assert.strictEqual(fn(this.a), 1);
//     //     });
//     // });
//     describe('# 异步', () => {
//        it('async_fn() 结果为 15', async () => {
//            assert.strictEqual(await async_fn(), 15);
//        });
//     })
// });