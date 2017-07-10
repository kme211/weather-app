import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import "./App.css";
import Header from "./Header";
import LocationChooser from "./LocationChooser";
import Loader from "./Loader";
import Weather from "./Weather";
import Sky from "./Sky";
import Clouds from "./Clouds";
import Footer from "./Footer";
import getWeather from "./services/getWeather";
import getAddress from "./services/getAddress";
import formatTemp from "./services/formatTemp";
import sentenceCase from "./services/sentenceCase";
import getNormalizedCondition from "./services/getNormalizedCondition";
import colors from "./colors";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      showLocOptions: true,
      locationChosen: false,
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
      location: { lat: 32.75, lng: -97.34 },
      address: "",
      height: window.innerHeight,
      width: window.innerWidth,
      flipperSideShown: "front"
    };

    this.getLocation = this.getLocation.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.chooseLocation = this.chooseLocation.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
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
      flipperSideShown:
        this.state.flipperSideShown === "front" ? "back" : "front"
    });
  }

  async getLocation() {
    try {
      const location = await this.props.getLocation();
      const address = await getAddress(location);
      this.setState({ location, address });
      return location;
    } catch (e) {
      this.setState({ error: e });
    }
  }

  async setLocation(location, address) {
    this.setState({ location, address });
  }

  chooseLocation() {
    this.setState({ locationChosen: true, showLocOptions: false });
  }

  changeLocation() {
    this.setState({
      locationChosen: false,
      showLocOptions: true,
      loaded: false,
      flipperSideShown: "front"
    });
  }

  async componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!prevState.locationChosen && this.state.locationChosen) {
      const weather = await getWeather(this.state.location);
      const newState = Object.assign({ loaded: true }, weather);
      this.setState(newState);
    }
  }

  render() {
    const {
      loaded,
      showLocOptions,
      locationChosen,
      location,
      address,
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

    let time =
      error || !dt ? "day" : (dt > sunrise) & (dt < sunset) ? "day" : "night";
    let summary = flipperSideShown === "front" ? desc : hourlySummary;
    let condition = error ? "error" : getNormalizedCondition(summary, time);

    const showSky =
      condition === "rain" ||
      condition === "snow" ||
      condition === "sun" ||
      condition === "stars";

    const numClouds = /cloud/i.test(summary)
      ? /mostly/i.test(summary) ? 5 : 3
      : 0;

    return (
      <div className={`App ${loaded ? `${condition} ${time}` : "default"}`}>
        <Header
          tempScale={tempScale}
          changeTempScale={this.changeTempScale}
          changeLocation={this.changeLocation}
          locationChosen={locationChosen}
        />
        {!showLocOptions &&
          <Motion style={{ opacity: spring(loaded ? 0 : 1) }}>
            {({ opacity }) => <Loader style={{ opacity: `${opacity}` }} />}
          </Motion>}

        {showLocOptions &&
          <LocationChooser
            location={location}
            address={address}
            setLocation={this.setLocation}
            getLocation={this.getLocation}
            chooseLocation={this.chooseLocation}
          />}

        {!showLocOptions &&
          <Motion
            style={{
              scale: spring(loaded ? 1 : 0, {
                stiffness: 60,
                damping: 5
              }),
              rotate: spring(loaded ? 360 : 0)
            }}
          >
            {({ scale, rotate }) =>
              <Weather
                style={{
                  WebkitTransform: `scale(${scale})`,
                  transform: `scale(${scale}) rotateY(${rotate}deg)`
                }}
                error={error}
                address={address}
                hourlySummary={hourlySummary}
                feelsLike={formatTemp(tempScale, feelsLike)}
                temp={formatTemp(tempScale, temp)}
                desc={sentenceCase(desc)}
                flipperSideShown={flipperSideShown}
                onClick={this.flip}
              />}
          </Motion>}

        {loaded &&
          showSky &&
          <Sky
            styles={{
              background: colors.sky[condition][time],
              zIndex: 2,
              position: "absolute"
            }}
            type={condition}
            speed={1}
            time={time}
            width={window.innerWidth}
            height={window.innerHeight}
          />}
        {loaded &&
          numClouds > 0 &&
          <Clouds windSpeed={windSpeed} numClouds={numClouds} />}
        <Footer />
      </div>
    );
  }
}

export default App;
