import MovieHeader from '../components/MovieHeader.jsx'

export default props => (
  <div style={{paddingTop: '70px'}}>
    <MovieHeader/>
    {props.children}
  </div>
)