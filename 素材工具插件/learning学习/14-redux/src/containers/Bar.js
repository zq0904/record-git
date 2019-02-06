import { connect } from 'react-redux'
import Bar from '../components/Bar'

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => {
  return {
    add() { dispatch({type: 'add'}) },
    asyncAdd() {
      dispatch((dispatch, getState) => {
        setTimeout(() => {
          dispatch({type: 'add'})
        }, 500)
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bar)
