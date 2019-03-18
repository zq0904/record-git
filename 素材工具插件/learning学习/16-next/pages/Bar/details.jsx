import { withRouter } from 'next/router' // withRouter 这个高阶组件会将当前路由对象注入到props上

export default withRouter(props => (
  <div>
    获取参数：{ props.router.query.id }
  </div>
))