import React from 'react';

function Tds(props) {
  return (
    //  <></> 简写片段
    <React.Fragment>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </React.Fragment>
  )
}

export default class Fragment extends React.Component {

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <Tds/>
            </tr>
          </tbody>
        </table>
        {/* 片段 可以具有key */}
        <dl>
          {
            [{id: 1, title: '标题1', content: '内容1'}, {id: 2, title: '标题2', content: '内容2'}].map(v => (
              <React.Fragment key={v.id}>
              <dt>{v.title}</dt>
              <dd>{v.content}</dd>
              </React.Fragment>
            ))
          }
        </dl>
      </div>
    );
  }
}
