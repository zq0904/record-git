import { connect } from 'react-redux'
import Foo from '../components/Foo'

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => {
  return {
    add() { dispatch({type: 'add'}) },
    asyncAdd() { 
      dispatch((dispatch, getState) => {
        console.log(getState(), 222)
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
)(Foo)
