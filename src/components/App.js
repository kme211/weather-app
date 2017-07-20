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

export default class App extends Component {
  state = {
    error: null,
    showLocOptions: true,
    locationChosen: false,
    loaded: false,
    tempScale: "f",
    location: { lat: 32.75, lng: -97.34 },
    address: "",
    height: window.innerHeight,
    width: window.innerWidth,
    flipperSideShown: "front"
  };

  weatherData = {
    temp: 0,
    dt: 0,
    desc: "",
    sunset: 0,
    sunrise: 0,
    feelsLike: 0,
    hourlySummary: "",
    windSpeed: 0
  };

  resizeHandler = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  changeTempScale = e => {
    this.setState({
      tempScale: this.state.tempScale === "f" ? "c" : "f"
    });
  };

  flip = e => {
    this.setState({
      flipperSideShown: this.state.flipperSideShown === "front"
        ? "back"
        : "front"
    });
  };

  getLocation = async () => {
    try {
      const location = await this.props.getLocation();
      const address = await getAddress(location);
      this.setState({ location, address });
      return location;
    } catch (e) {
      this.setState({ error: e });
    }
  };

  setLocation = async (location, address) => {
    this.setState({ location, address });
  };

  chooseLocation = () => {
    this.setState({ locationChosen: true, showLocOptions: false });
  };

  changeLocation = () => {
    this.setState({
      locationChosen: false,
      showLocOptions: true,
      loaded: false,
      flipperSideShown: "front"
    });
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.resizeHandler);
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (!prevState.locationChosen && this.state.locationChosen) {
      try {
        const weather = await getWeather(this.state.location);
        this.weatherData = weather;
        this.setState({ loaded: true });
      } catch(err) {
        this.setState({ error: 'Unable to retrieve the weather data. Please try again later.', loaded: true })
      }
    }
  };

  render() {
    const {
      loaded,
      showLocOptions,
      locationChosen,
      location,
      address,
      error,
      tempScale,
      flipperSideShown
    } = this.state;

    const data = this.weatherData;
    let time = error || !data.dt
      ? "day"
      : (data.dt > data.sunrise) & (data.dt < data.sunset) ? "day" : "night";
    let summary = flipperSideShown === "front" ? data.desc : data.hourlySummary;
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
            {({ scale, rotate }) => (
              <Weather
                style={{
                  WebkitTransform: `scale(${scale})`,
                  transform: `scale(${scale}) rotateY(${rotate}deg)`
                }}
                error={error}
                address={address}
                hourlySummary={data.hourlySummary}
                feelsLike={formatTemp(tempScale, data.feelsLike)}
                temp={formatTemp(tempScale, data.temp)}
                desc={sentenceCase(data.desc)}
                flipperSideShown={flipperSideShown}
                onClick={this.flip}
              />
            )}
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
          <Clouds windSpeed={data.windSpeed} numClouds={numClouds} />}
        <Footer />
      </div>
    );
  }
}
