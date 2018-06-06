// 同步测试
// module.exports = function (...rest) {
//     var sum = 0;
//     for (let n of rest) {
//         sum += n;
//     }
//     return sum;
// }

// 异步测试
const fs = require('mz/fs');
module.exports = async () => {
    let expression = await fs.readFile('./_async_test.txt', 'utf-8');
    return new Function('return ' + expression)();
};