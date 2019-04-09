import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

// 递归路径 - 递归组件
const peoples = [
  { id: 0, name: 'M', friends: [1, 2, 3] },
  { id: 1, name: 'S', friends: [0, 3] },
  { id: 2, name: 'K', friends: [0, 1, 3] },
  { id: 3, name: 'D', friends: [1, 2] }
]
const findPeople = id => peoples.find(v => v.id === id)

class P extends React.Component {
  render() {
    const people = findPeople(this.props.match.params.id - 0 || 0)
    return (
      <Fragment>
        <h2>当前的人：{people.name}</h2>
        <dl>
          <dt>具有的朋友：</dt>
          {
            people.friends.map(v => {
              const people = findPeople(v)
              return (
                <dd key={people.id}>
                  <Link to={this.props.match.url+`/${people.id}`}>{people.name}</Link>
                </dd>
              )
            })
          }
          <Route path={this.props.match.path+'/:id'} component={P} />
        </dl>
      </Fragment>
    );
  }
}

export default P