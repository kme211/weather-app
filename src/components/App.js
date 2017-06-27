import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import "./App.css";
import Loader from "./Loader";
import Weather from "./Weather";
import Sky from "./Sky";
import getLocation from "./services/getLocation";
import getWeather from "./services/getWeather";
import formatTemp from "./services/formatTemp";
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
      height: window.innerHeight,
      width: window.innerWidth
    };

    this.handleClick = this.handleClick.bind(this);
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  resizeHandler() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  handleClick() {
    this.setState({
      tempScale: this.state.tempScale === "f" ? "c" : "f"
    });
  }

  async componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
    const location = await getLocation();
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
      hourlySummary
    } = this.state;

    const time = error
      ? "day"
      : (dt > sunrise) & (dt < sunset) ? "day" : "night";
    const condition = error
      ? "error"
      : desc.toLowerCase() === "clear"
          ? time === "day" ? "sun" : "stars"
          : desc.toLowerCase();
    const showSky =
      condition === "rain" ||
      condition === "snow" ||
      condition === "sun" ||
      condition === "stars";

    return (
      <div className={`App ${condition}`}>
        <Motion style={{ opacity: spring(loaded ? 0 : 1) }}>
          {({ opacity }) => <Loader style={{ opacity: `${opacity}` }} />}
        </Motion>

        <Motion
          style={{
            scale: spring(loaded ? 1 : 0, {
              stiffness: 60,
              damping: 5
            }),
            rotate: spring(loaded ? 360 : 0, {
              stiffness: 60,
              damping: 5
            })
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
              handleClick={this.handleClick}
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
      </div>
    );
  }
}

export default App;
