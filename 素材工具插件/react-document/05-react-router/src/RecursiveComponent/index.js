import React, { Component } from 'react';
import './index.less'

const Sidebar = (props) => (
  <ul>
    { props.data.map(v => <Li key={v.id} v={v} />) }
  </ul>
)
class Li extends Component {
  state = { isUnfold: false }
  get isChild() {
    return this.props.v.child && this.props.v.child.length > 0
  }
  handleClick = () => {
    if (!this.isChild) return
    this.setState(prevState => ({
      isUnfold: !prevState.isUnfold
    }))
  }
  render() {
    const { v } = this.props
    return (
      <li>
        <h2 onClick={this.handleClick}>
        {
          this.isChild ? (
            this.state.isUnfold ? '-' : '+'
          ) : ' '
        }
        { ' ' + v.title }
        </h2>
        { this.isChild && this.state.isUnfold && <Sidebar data={v.child} /> }
      </li>
    )
  }
}

export default class index extends React.Component {
  state = {
    SidebarData: [{
      id: 1,
      title: '一',
      child: [{
        id: 2,
        title: '1-1'
      }, {
        id: 3,
        title: '1-2',
        child: [{
          id: 10,
          title: '1-2-1'
        }, {
          id: 11,
          title: '1-2-2'
        }]
      }]
    }, {
      id: 4,
      title: '二',
      child: [{
        id: 5,
        title: '2-1'
      }, {
        id: 6,
        title: '2-2'
      }]
    }]
  }
  render() {
    return (
      <div>
        <h2>递归组件</h2>
        <Sidebar data={this.state.SidebarData} />
      </div>
    );
  }
}