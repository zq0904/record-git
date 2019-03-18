import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Movie from '../../layouts/Movie.jsx'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Head from 'next/head'

class MovieHome extends Component {
  static async getInitialProps({query}) {
    const movieList = await fetch(`http://127.0.0.1:3301/${query.type}`).then(res => res.json())
    return { movieList }
  }
  render() {
    const {
      movieList,
      router
    } = this.props
    return (
      <Movie>
        {/* styled-jsx语法在server端会转义 > 尽量不要写 */}
        <style jsx>{`
          .movie-type {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .movie-type a:first-child {
            margin-top: 10px;
          }
          .movie-type a {
            display: block;
            margin-bottom: 10px;
            padding-top: 10px;
            width: 400px;
            text-align: center;
            border: 1px solid #ccc;
          }
          .movie-type a:hover {
            box-shadow: 2px 2px 5px #ccc;
          }
        `}</style>
        <Head>
          <title>豆瓣电影</title>
          <meta name="keywords" content="电影，经典电影排行" />
        </Head>
        <section className="movie-type">
          {
            movieList.map(v => (
              <Link key={v.id} href={`/MovieDetailed?type=${router.query.type}&id=${v.id}`}>
                <a>
                  <img src={v.img} alt={v.title}/>
                  <p>名称：{v.title}</p>
                  <p>评分：{v.rating}</p>
                </a>
              </Link>
            ))
          }
        </section>
        
      </Movie>
    )
  }
}
export default withRouter(MovieHome)