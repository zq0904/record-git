import Link from 'next/link'

export default () => (
  <section className="movie-header">
    <style jsx>{`
      .movie-header ul {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 70px;
        line-height: 70px;
      }
      .movie-header ul li {
        flex: 1;
        text-align: center;
        background-color: #1A2634;
        border-left: 1px solid #fff;
      }
      .movie-header ul li a {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 24px;
        color: #fff;
      }
      .movie-header ul li:first-child {
        border-left: 0 none;
      }
    `}</style>
    <ul>
      <li>
        <Link href="/Movie?type=onlineTheater"><a>正在热映</a></Link>
      </li>
      <li>
        <Link href="/Movie?type=upcoming"><a>即将上映</a></Link>
      </li>
      <li>
        <Link href="/Movie?type=top250"><a>top250</a></Link>
      </li>
    </ul>
  </section>
)