import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class ModalSwitch extends Component {

  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    let { location } = this.props;
    console.log('nextProps  下一个值', nextProps)
    console.log('this.props 没有改变 当前值', this.props)
    // set previousLocation if props.location is not modal
    // 通过 Link组件跳转 action PUSH
    // 通过 浏览器的前进后退键 action POP
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      // 保存上一个 this.props.location
      this.previousLocation = this.props.location;
    }
  }
  componentWillMount() {
    console.log(this.props)
  }
  render() {
    let { location } = this.props;
    console.log(this.props.location)
    let isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render

    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/Test" component={Home} />
          <Route path="/Test/gallery" component={Gallery} />
          <Route path="/Test/img/:id" component={ImageView} />
        </Switch>
        {isModal ? <Route path="/Test/img/:id" component={Modal} /> : null}
      </div>
    );
  }
}

const IMAGES = [
  { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
  { id: 1, title: "Lime Green", color: "LimeGreen" },
  { id: 2, title: "Tomato", color: "Tomato" },
  { id: 3, title: "Seven Ate Nine", color: "#789" },
  { id: 4, title: "Crimson", color: "Crimson" }
];

function Thumbnail({ color }) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        background: color
      }}
    />
  );
}

function Image({ color }) {
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: color
      }}
    />
  );
}

function Home() {
  return (
    <div>
      <Link to="/Test/gallery">Visit the Gallery</Link>
      <h2>Featured Images</h2>
      <ul>
        <li>
          <Link to="/Test/img/2">Tomato</Link>
        </li>
        <li>
          <Link to="/Test/img/4">Crimson</Link>
        </li>
      </ul>
    </div>
  );
}

function Gallery() {
  return (
    <div>
      {IMAGES.map(i => (
        <Link
          key={i.id}
          to={{
            pathname: `/Test/img/${i.id}`,
            // this is the trick!
            state: { modal: true }
          }}
        >
          <Thumbnail color={i.color} />
          <p>{i.title}</p>
        </Link>
      ))}
    </div>
  );
}

function ImageView({ match }) {
  let image = IMAGES[parseInt(match.params.id, 10)];

  if (!image) return <div>Image not found</div>;

  return (
    <div>
      <h1>{image.title}</h1>
      <Image color={image.color} />
    </div>
  );
}

function Modal({ match, history }) {
  let image = IMAGES[parseInt(match.params.id, 10)];

  if (!image) return null;

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div
      onClick={back}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)"
      }}
    >
      <div
        className="modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
        <h1>{image.title}</h1>
        <Image color={image.color} />
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  );
}

function ModalGallery() {
  return (
    <Router>
      <Route component={ModalSwitch} />
    </Router>
  );
}

export default ModalGallery;
