import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import "./App.css";
import Header from "./Header";
import Loader from "./Loader";
import Weather from "./Weather";
import Sky from "./Sky";
import Clouds from "./Clouds";
import Footer from "./Footer";
import getWeather from "./services/getWeather";
import formatTemp from "./services/formatTemp";
import getNormalizedCondition from "./services/getNormalizedCondition";
import colors from "./colors";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loaded: false,
      temp: 0,
      tempScale: "f",
      dt: 0,
      desc: "",
      sunset: 0,
      sunrise: 0,
      feelsLike: 0,
      hourlySummary: "",
      windSpeed: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      flipperSideShown: "front"
    };

    this.changeTempScale = this.changeTempScale.bind(this);
    this.resizeHandler = this.resizeHandler.bind(this);
    this.flip = this.flip.bind(this);
  }

  resizeHandler() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  changeTempScale(e) {
    this.setState({
      tempScale: this.state.tempScale === "f" ? "c" : "f"
    });
  }

  flip(e) {
    this.setState({
      flipperSideShown: this.state.flipperSideShown === "front"
        ? "back"
        : "front"
    });
  }

  async componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
    const location = await this.props.getLocation();
    const weather = await getWeather(location);
    const newState = Object.assign({ loaded: true }, weather);
    this.setState(newState);
  }

  render() {
    const {
      loaded,
      error,
      tempScale,
      temp,
      dt,
      sunrise,
      sunset,
      desc,
      feelsLike,
      windSpeed,
      hourlySummary,
      flipperSideShown
    } = this.state;

    let time = (error || !dt) ? "day" : ((dt > sunrise) & (dt < sunset) ? "day" : "night");
    let condition = error ? "error" : getNormalizedCondition(flipperSideShown === "front" ? desc : hourlySummary, time);

    const showSky =
      condition === "rain" ||
      condition === "snow" ||
      condition === "sun" ||
      condition === "stars";

    const numClouds = /cloud/.test(condition)
      ? /mostly/.test(condition) ? 5 : 3
      : 0;

    return (
      <div className={`App ${condition} ${time}`}>
        <Header tempScale={tempScale} changeTempScale={this.changeTempScale} />
        <Motion style={{ opacity: spring(loaded ? 0 : 1) }}>
          {({ opacity }) => <Loader style={{ opacity: `${opacity}` }} />}
        </Motion>

        <Motion
          style={{
            scale: spring(loaded ? 1 : 0, {
              stiffness: 60,
              damping: 5
            }),
            rotate: spring(loaded ? 360 : 0)
          }}
        >

          {({ scale, rotate }) => (
            <Weather
              style={{
                WebkitTransform: `scale(${scale})`,
                transform: `scale(${scale}) rotateY(${rotate}deg)`
              }}
              error={error}
              hourlySummary={hourlySummary}
              feelsLike={formatTemp(tempScale, feelsLike)}
              temp={formatTemp(tempScale, temp)}
              desc={desc}
              flipperSideShown={flipperSideShown}
              onClick={this.flip}
            />
          )}
        </Motion>

        {showSky &&
          <Sky
            styles={{
              background: colors.sky[condition][time],
              zIndex: 2,
              position: "absolute"
            }}
            type={
              condition === "clear"
                ? time === "day" ? "sun" : "stars"
                : condition
            }
            speed={1}
            time={time}
            width={window.innerWidth}
            height={window.innerHeight}
          />}
        {numClouds > 0 &&
          <Clouds windSpeed={windSpeed} numClouds={numClouds} />}
        <Footer />
      </div>
    );
  }
}

export default App;
