import React from 'react';

// diffing算法
// 在比较 2个相同类型的ReactDom元素 保持相同的底层DOM节点 并仅更新已更改的属性
// key 不必是全球唯一 但必须是该数组中唯一 最好不要使用数组的索引
export default class Reconciliation extends React.Component {
  render() {
    return (
      <div>Reconciliation</div>
    );
  }
}
