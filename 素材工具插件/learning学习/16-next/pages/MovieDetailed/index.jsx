import Movie from '../../layouts/Movie.jsx'
import fetch from 'isomorphic-unfetch'

const MovieDetailed = props => {
  const {detailed} = props
  return (
    <Movie>
      <style jsx>{`
        .movie-detailed {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .movie-detailed div:first-child {
          margin-top: 10px;
        }
        .movie-detailed div {
          display: block;
          margin-bottom: 10px;
          paddingTop: 10px;
          width: 400px;
          text-align: center;
          border: 1px solid #ccc;
        }
        .movie-detailed div p:last-child {
          padding: 10px;
        }
        .movie-detailed div:hover {
          box-shadow: 2px 2px 5px #ccc;
        }
      `}</style>
      <section className="movie-detailed">
        <div>
          <img src={detailed.img} alt={detailed.title} />
          <p>上映时间：{detailed.detailed[0].year}</p>
          <p>电影名称：{detailed.title}</p>
          <p>电影类型：{detailed.genres.join(',')}</p>
          <p>电影评分：{detailed.rating}</p>
          <p>电影描述：{detailed.detailed[0].summary}</p>
        </div>
      </section>
    </Movie>
  )
}

MovieDetailed.getInitialProps = async ({query: {type, id}}) => {
  const detailed = await fetch(`http://127.0.0.1:3301/${type}/${id}?_embed=detailed`).then(res => res.json())
  return {detailed}
}

export default MovieDetailed