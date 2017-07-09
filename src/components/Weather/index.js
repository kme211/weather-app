import React from "react";
import "./styles.css";
import Flipper from "../Flipper";
import Icon from "../Icon";

const Weather = ({
  onClick,
  temp,
  address,
  feelsLike,
  desc,
  hourlySummary,
  error,
  flipperSideShown,
  tempScale,
  changeTempScale,
  style
}) => {
  const component = error
    ? <div className="Weather__error">{error}</div>
    : <Flipper showSide={flipperSideShown} style={style}>
        <div className="Weather">
          <h1 className="Weather__address">{address}</h1>
          <div className="Weather__temp">
            {temp}
            <div className="Weather__feels-like">
              (but it feels like {feelsLike})
            </div>
          </div>

          <div className="Weather__desc">{desc} right now.</div>
          
          <div className="flip-btn" onClick={onClick}><Icon icon="arrow" /></div>
        </div>
        <div className="Weather">
          <div className="Weather__desc">{hourlySummary}</div>
          <div className="flip-btn reverse" onClick={onClick}><Icon icon="arrow" /></div>
        </div>
      </Flipper>;
  return component;
};

export default Weather;
